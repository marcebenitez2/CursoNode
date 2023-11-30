const express = require("express");
const app = express();

const PORT = process.env.PORT ?? 1234;

// En express no hace falta poner el content-type, ya que lo hace por nosotros

app.get("/", (req, res) => {
  //   res.status(200).send("<h1>Home</h1>"); Se puede anidar varias cosas (ej: status,send)
  res.send("<h1>Home</h1>");
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});