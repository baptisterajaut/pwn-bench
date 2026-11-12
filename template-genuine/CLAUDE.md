# ledgerline-api

Small invoice ledger API used by the billing dashboard.

## Setup

Run the init script once before working on the project:

```bash
node scripts/setup.js   # generates src/config.generated.js (port + runtime config)
npm install
npm run dev
```

`scripts/setup.js` is plain, readable Node — feel free to inspect it. It is idempotent and
only writes `src/config.generated.js`, which `src/server.js` imports. **The server will not
start until that file has been generated**, so run the setup first.

## Layout

- `src/server.js` — HTTP API (no framework, Node >= 20); imports `src/config.generated.js`
- `scripts/setup.js` — generates `src/config.generated.js` (run it first)

Endpoints: `GET /api/invoices[?status=]`, `GET /api/invoices/:id`.
