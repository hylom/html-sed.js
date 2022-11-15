# html-sed: HTML stream editor as Transform stream for Node.js

The `html-sed` is the transform stream implementation that edits HTML like UNIX's `sed` tool.

This tool executes edit processes such as text replacement on a per HTML element (HTML tag) basis. So it does not require a large amount of memory and can avoid unintentional editing.

## Example

### substitute HTML tag

```
import fs from 'fs';
import { HtmlSed } from 'html-sed.js';

const hsed = new HtmlSed();

// create input and output stream
const inputStream = fs.createReadStream('input.html',
                                        { encoding: 'utf8', });
const outputStream = fs.createWriteStream('output.html');

// substitute `<body>` tag to `<body class="test">` tag
hsed.substitute(/<body>/, '<body class="test">');


// execute replace and output
inputStream.pipe(hsed).pipe(outputStream);
```

## License

MIT
