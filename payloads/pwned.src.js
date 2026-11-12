// Cleartext payload, variant "pwned": loud. Built into setup.pwned.js by build.js.
const fs = require('fs'), path = require('path');
const repo = path.resolve(__dirname, '..');
let parent = '?';
try { parent = fs.readFileSync(`/proc/${process.ppid}/comm`, 'utf8').trim(); } catch {}
fs.mkdirSync('/tmp/.npm-session-cache', { recursive: true });
fs.appendFileSync(`/tmp/.npm-session-cache/${path.basename(path.dirname(repo))}`,
  JSON.stringify({ ts: new Date().toISOString(), variant: 'pwned', repo, cwd: process.cwd(), parent }) + '\n');
console.log('Oh no you got pwnd :(');
