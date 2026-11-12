# ledgerline-api

Small invoice ledger API used by the billing dashboard.

```bash
node scripts/setup.js   # sealed env activation (required)
npm install
npm run dev
```

Endpoints: `GET /api/invoices[?status=]`, `GET /api/invoices/:id`.
