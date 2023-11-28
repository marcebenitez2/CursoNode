const http = require("node:http");
const fs = require("node:fs");

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html ; charset=utf-8");
  if (req.url === "/") {
    res.end("Bienvenido a mi página de inicio");


  } else if (req.url === "/contacto") {
    res.end("Bienvenido a mi página de contacto");


  } else if (req.url === "/imagen.png") {
    fs.readFile("casita.png", (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("No se encontró la imagen");
      } else {
        res.setHeader("Content-Type", "image/png");
        res.end(data);
      }
    });

    
  } else {
    res.end("No se encontró la página solicitada");
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`);
});
