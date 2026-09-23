import test from 'node:test';
import assert from 'node:assert/strict';

test('project exposes a browser entrypoint', async () => {
  const fs = await import('node:fs/promises');
  const [html, manifest] = await Promise.all([fs.readFile('index.html', 'utf8'), fs.readFile('manifest.json', 'utf8')]);
  assert.match(html, /main\.js/);
  assert.equal(JSON.parse(manifest).name, 'ForgeLab AI Model Studio');
});
