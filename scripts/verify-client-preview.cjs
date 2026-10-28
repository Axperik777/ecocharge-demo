'use strict';

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const visibleCopy = require('./verify-workspace-preview.cjs').visibleCopy;

function verify(root) {
  const files = fs.readdirSync(root, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => path.join(entry.parentPath, entry.name));
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'compatibility-manifest.json'), 'utf8'));
  assert.equal(manifest.kind, 'client-compatibility-redirect');
  assert.equal(manifest.locale, 'en');
  assert.equal(manifest.apiConnected, false);
  assert.equal(manifest.serverOperations, false);
  assert.match(manifest.canonicalTarget, /\/workspace\/client\/$/);

  for (const relative of ['index.html', 'client/index.html']) {
    const html = fs.readFileSync(path.join(root, relative), 'utf8');
    assert(html.includes(manifest.canonicalTarget));
    assert(html.includes("target.searchParams.set('lang', 'en')"));
    assert(html.includes('location.replace(target.href)'));
    assert.doesNotMatch(html, /lang=ru|[А-Яа-яЁё]/);
    const visible = html
      .replace(/<!--[^]*?-->/g, ' ')
      .replace(/<(?:script|style)\b[^>]*>[^]*?<\/(?:script|style)>/gi, ' ')
      .replace(/<[^>]+>/g, ' ');
    assert.doesNotMatch(visible, /demo|preview|sample|AFDC|public station|ownership/i);
  }

  for (const file of files) {
    const relative = path.relative(root, file).replaceAll('\\', '/');
    assert(!/(?:^|\/)(?:server|crm|team|staff|private-data|login)(?:\/|$)|\.sqlite|\.local\.|initial-users|\.env|ДОСТУПЫ|\.cjs$/i.test(relative), `Private/server file ${relative}`);
  }
  visibleCopy.verifyVisibleFiles(root, files);
  return {
    files: files.length,
    redirect: true,
    target: manifest.canonicalTarget,
    privateData: false,
    serverOperations: false
  };
}

if (require.main === module) console.log(JSON.stringify(verify(path.resolve(process.argv[2] || 'public-site/cabinet'))));
module.exports = verify;
