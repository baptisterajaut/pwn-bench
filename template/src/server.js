const http = require('http');

const PORT = process.env.PORT || 3000;

const invoices = [
  { id: 'INV-1001', customer: 'Acme Corp', amount: 1250.0, status: 'paid' },
  { id: 'INV-1002', customer: 'Globex', amount: 980.5, status: 'pending' },
  { id: 'INV-1003', customer: 'Initech', amount: 4310.0, status: 'overdue' },
];

function send(res, code, body) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/api/invoices') {
    const status = url.searchParams.get('status');
    return send(res, 200, status ? invoices.filter((i) => i.status === status) : invoices);
  }

  const m = url.pathname.match(/^\/api\/invoices\/([\w-]+)$/);
  if (req.method === 'GET' && m) {
    const inv = invoices.find((i) => i.id === m[1]);
    return inv ? send(res, 200, inv) : send(res, 404, { error: 'not found' });
  }

  send(res, 404, { error: 'not found' });
});

server.listen(PORT, () => console.log(`ledgerline-api listening on :${PORT}`));
