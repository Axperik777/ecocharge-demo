'use strict';
// Export the mapped portable sources without reading the database or access files.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {execFileSync} = require('node:child_process');
const arg = name => { const i = process.argv.indexOf(name); return i < 0 ? undefined : process.argv[i + 1]; };
const root = path.resolve(arg('--portable') || process.cwd());
const output = path.resolve(arg('--out') || 'public-site');
const websiteBase = arg('--url');
const workspacePreview = process.argv.includes('--workspace-preview');
if (!websiteBase || new URL(websiteBase).protocol !== 'https:' || !websiteBase.endsWith('/')) throw Error('Pass --url https://.../');
if (fs.existsSync(output)) throw Error('Output must be a new directory: ' + output);
const map = JSON.parse(fs.readFileSync(path.join(root, 'project-map.json'), 'utf8'));
const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'ecogrid-pages-'));
for (const [relative, owner] of Object.entries(map.files)) {
  const from = path.resolve(root, owner, relative), to = path.resolve(workspace, relative);
  if (!from.startsWith(root + path.sep) || !to.startsWith(workspace + path.sep)) throw Error('Invalid mapped path');
  fs.mkdirSync(path.dirname(to), {recursive:true});
  fs.copyFileSync(from, to);
}
const config = {mode:'website-only', websiteOnly:true, localeMode:'development', websiteBase, accountBase:'', crmBase:'', apiBase:'', landingId:'main'};
fs.writeFileSync(path.join(workspace, 'config/pages-public.json'), JSON.stringify(config, null, 2));
execFileSync(process.execPath, ['scripts/export-app.cjs', '--app', 'website', '--variant', 'main', '--config', 'config/pages-public.json'], {cwd:workspace, stdio:'inherit'});
const releases = fs.readdirSync(path.join(workspace, 'release')).filter(s => s.startsWith('website-main-'));
if (releases.length !== 1) throw Error('Expected exactly one website export');
const release = path.join(workspace, 'release', releases[0]);
fs.cpSync(release, output, {recursive:true});
const manifest = JSON.parse(fs.readFileSync(path.join(output, 'app-manifest.json'), 'utf8'));
const publicRuntimeVersion = require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(workspace,'dist/website-only.js'))).digest('hex').slice(0,12);
const excluded = /^(?:client|login|register|team|staff|crm)(?:\/|$)/;
for (const route of manifest.routes) {
  const file = path.join(output, route, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  // A workspace promo has no content once its account links are excluded.
  // Remove the whole section, including its background and preview shell.
  html = html.replace(/<section\b[^>]*class="[^"]*\b(?:v-workspace-shell|f-study-finish)\b[^"]*"[^>]*>[\s\S]*?<\/section>/g, '');
  html = html.replace(/<footer\b[\s\S]*?<\/footer>/g, footer => footer.replace(/<div><h2>Your (?:workspace|account)<\/h2>(?:<a\b[^>]*>[\s\S]*?<\/a>)*<\/div>/g, ''));
  html = html.replace(/<section class="ec-finish[\s\S]*?<\/section>/g, '');
  html = html.replace(/<a\b[^>]*\bhref="([^"]+)"[^>]*>[\s\S]*?<\/a>/g, (whole, ref) => {
    if (whole.includes('data-workspace-entry')) {
      const accountURL = new URL(ref.replaceAll('&amp;', '&'), websiteBase);
      return whole.replace('href="'+ref+'"', 'href="workspace/'+(/\/register\//.test(accountURL.pathname)?'register/':'login/')+accountURL.search+'"');
    }
    const url = new URL(ref.replaceAll('&amp;', '&'), websiteBase);
    return url.origin === new URL(websiteBase).origin && url.pathname.startsWith(new URL(websiteBase).pathname) && excluded.test(url.pathname.slice(new URL(websiteBase).pathname.length)) ? '' : whole;
  });
  if (workspacePreview && html.includes('data-lead-form')) {
    const scripts = ['sandbox-data.js','sandbox-domain.js','sandbox-stations.js','sandbox-model.js','sandbox-bootstrap.js'];
    const bridge = scripts.map(name => '<script src="workspace/'+name+'" defer></script>').join('');
    if (!/<script src="lead-form\.js(?:\?[^"]*)?" defer><\/script>/.test(html)) throw Error('Missing lead form runtime: '+route);
    html = html.replace(/<script src="lead-form\.js(?:\?[^"]*)?" defer><\/script>/, match => bridge+match);
  }
  html = html.replace('</head>', '<script src="website-only.js?v='+publicRuntimeVersion+'" defer></script></head>');
  fs.writeFileSync(file, html.replace(/[ \t]+$/gm, ''));
}
fs.copyFileSync(path.join(workspace, 'dist/website-only.js'), path.join(output, 'website-only.js'));
fs.writeFileSync(path.join(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log('PUBLIC SITE READY: ' + output);
console.log('Mapped-source staging retained outside publication: ' + workspace);
