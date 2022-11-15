import stream from 'stream';
import { StringDecoder } from 'string_decoder';

export class HtmlSed extends stream.Transform {
  constructor(replaceFrom, replaceTo, options={}) {
    super(options);
    this.replaceFrom = replaceFrom;
    this.replaceTo = replaceTo;
    this.options = options;
    this.on('end', this.onEnd.bind(this));
    this.on('finish', this.onFinish.bind(this));
    this._decoder = new StringDecoder('utf8');
    this._rest = '';
  }

  onEnd() {
    //console.log(this._rest);
    this.push(this._rest);
    console.log('hsed read done.');
  }
  onFinish() {
    console.log('hsed write done.');
  }
  
  _transform(chunk, encoding, callback) {
    if (encoding == 'buffer') {
      chunk = this._decoder.write(chunk);
    } else if (encoding != 'utf8') {
      // encoding other than utf8 is not supported, do nothing
      //console.log(`encoding is not 'utf8': ${encoding}`);
      this.push(chunk);
      callback();
      return;
    }
    chunk = this._rest + chunk;
    const { elements, rest } = this._parseChunk(chunk);
    this._rest = rest;
    //this.push(chunk);
    const replacer = elem => {
      return elem.replace(this.replaceFrom, this.replaceTo);
    };
    this.push(elements.map(replacer).join(''));
    callback();
  }

  _parseChunk(chunk) {
    const rexTag = /<(?:".*?"|'.*?'|[^'"])+?>/;
    const elements = [];
    while (true) {
      const m = chunk.match(rexTag);
      //console.log(m);
      if (!m) {
        return { elements, rest: chunk };
      }
      if (m.index == 0) {
        elements.push(m[0]);
        chunk = chunk.slice(m[0].length);
      } else {
        elements.push(chunk.slice(0, m.index));
        elements.push(m[0]);
        chunk = chunk.slice(m.index + m[0].length);
      }
    }
  }
}
