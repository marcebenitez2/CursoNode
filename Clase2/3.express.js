const express = require("express");
const app = express();

const PORT = process.env.PORT ?? 1234;

// En express no hace falta poner el content-type, ya que lo hace por nosotros

app.get("/", (req, res) => {
  //   res.status(200).send("<h1>Home</h1>"); Se puede anidar varias cosas (ej: status,send)
  res.json({ message: "Home" });
});

app.post("/pokemon", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const parsedBody = JSON.parse(body);
    res.writeHead(201, { "Content-Type": "text/json ; charset=utf-8" });
    res.end(JSON.stringify(parsedBody));
  });
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
