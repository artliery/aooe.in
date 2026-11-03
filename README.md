# aooe.in

Web panel for local use.

## Localhost

Requires Node.js 18 or newer.

```bash
npm start
```

The panel listens on `http://127.0.0.1:8080/`.

Override the bind address or port when needed:

```bash
HOST=127.0.0.1 PORT=8080 npm start
```

`GET /api/status` returns the same runtime details as JSON.
