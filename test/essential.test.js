import { HtmlSed } from '../lib/html-sed.js';
import { streamToString, getTestFileAsStream } from './test-helpers.js';

test('edit test1.html to replace <body> tag', async () => {
  const hsed = new HtmlSed(/<body>/, '<body class="test">');
  const stream = getTestFileAsStream('test0.html');
  const result = await streamToString(stream.pipe(hsed));

  const expected = `<!doctype html>
<html lang="ja">
<head><title>test</title></head>
<body class="test"></body>
</html>`;

  expect(result).toBe(expected);
});
