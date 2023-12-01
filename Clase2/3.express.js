const dittoJSON = require("./pokemon/ditto.json");
const express = require("express");

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable("x-powered-by"); // Para que no se vea que estamos usando express, MAS SEGURIDAD


app.use(express.json()); // Middleware que parsea el body de un JSON y lo mete en req.body


// // Primer parametro iria la URL de lo que quiero que afecte el middleware
// app.use((req, res, next) => {
//  if (req.method !== 'POST') return next(); // Si no es un POST, no hago nada
//  if (req.headers['content-type'] !== 'application/json') return next(); // Si no es un JSON, no hago nada

//   //   
//   let body = "";

//   req.on("data", (chunk) => {
    // body += chunk.toString();
//   });

//   req.on("end", () => {
//     const parsedBody = JSON.parse(body);
//     parsedBody.timestamp = Date.now();
//     // mutar la request y meter la informacion en el req.body
//     req.body = parsedBody;
//     next();
//   });
// });

// En express no hace falta poner el content-type, ya que lo hace por nosotros

app.get("/pokemon/ditto", (req, res) => {
  res.setHeader("Content-Type", "text/json ; charset=utf-8");
  return res.end(JSON.stringify(dittoJSON));
});

app.post("/pokemon", (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
