const http = require("http");
const { version: nodeVersion } = process;

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 8080);
const startedAt = new Date();

function localStamp(date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(date);
}

function status() {
  return {
    name: "aooe.in",
    host,
    port,
    url: `http://${host}:${port}/`,
    node: nodeVersion,
    pid: process.pid,
    startedAt: localStamp(startedAt),
    now: localStamp(new Date()),
  };
}

function page(info) {
  const rows = [
    ["Address", info.url],
    ["Bind", `${info.host}:${info.port}`],
    ["Node", info.node],
    ["Process", String(info.pid)],
    ["Started", info.startedAt],
    ["Now", info.now],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<div class="row"><dt>${label}</dt><dd>${value}</dd></div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>aooe.in · localhost</title>
  <style>
    :root {
      color-scheme: light;
      --ink: #1a1714;
      --muted: #6d645b;
      --line: #e2d9cc;
      --paper: #f6f1e8;
      --card: #fffdf8;
      --accent: #b64a1e;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background:
        radial-gradient(circle at top left, #fff 0, transparent 32rem),
        var(--paper);
      color: var(--ink);
      font-family: "Iowan Old Style", Palatino, Georgia, serif;
    }
    main {
      max-width: 42rem;
      margin: 0 auto;
      padding: 4.5rem 1.5rem 3rem;
    }
    .mark {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 2.5rem;
    }
    .mark strong {
      font-size: 1.35rem;
      letter-spacing: -0.03em;
    }
    .pill {
      font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--accent);
      border: 1px solid var(--accent);
      border-radius: 999px;
      padding: 0.35rem 0.7rem;
    }
    h1 {
      margin: 0 0 0.6rem;
      font-size: clamp(2.6rem, 7vw, 4.4rem);
      font-weight: 500;
      letter-spacing: -0.045em;
      line-height: 0.95;
    }
    p.lead {
      margin: 0 0 2rem;
      max-width: 28rem;
      color: var(--muted);
      font-size: 1.15rem;
      line-height: 1.45;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 1.1rem;
      padding: 0.4rem 1.25rem;
    }
    .row {
      display: grid;
      grid-template-columns: 7rem 1fr;
      gap: 1rem;
      padding: 0.9rem 0;
      border-top: 1px solid var(--line);
    }
    .row:first-child { border-top: 0; }
    dt {
      margin: 0;
      color: var(--muted);
      font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
      font-size: 0.78rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    dd {
      margin: 0;
      font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
      font-size: 0.95rem;
      overflow-wrap: anywhere;
    }
  </style>
</head>
<body>
  <main>
    <div class="mark">
      <strong>aooe.in</strong>
      <span class="pill">localhost</span>
    </div>
    <h1>Web panel is up.</h1>
    <p class="lead">This process is bound to your machine. Open the address below in a browser on the same computer.</p>
    <dl class="card">${body}</dl>
  </main>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  const path = (req.url || "/").split("?")[0];
  if (path === "/api/status") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(status()));
    return;
  }
  if (path !== "/") {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(page(status()));
});

server.listen(port, host, () => {
  console.log(`aooe.in web panel at http://${host}:${port}/`);
});
