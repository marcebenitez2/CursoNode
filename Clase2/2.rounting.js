const http = require("node:http");

const dittoJSON = require("./pokemon/ditto.json");

const processRequest = (req, res) => {
  const { method, url } = req;
  console.log(method);

  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon/ditto":
          res.setHeader("Content-Type", "text/json ; charset=utf-8");
          return res.end(JSON.stringify(dittoJSON));
        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html ; charset=utf-8");
          return res.end("<h1>404</h1>");
      }
    case "POST":
      switch (url) {
        case "/pokemon": {
          let body = "";

          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", () => {
            const parsedBody = JSON.parse(body);
            res.writeHead(201, { "Content-Type": "text/json ; charset=utf-8" });
            res.end(JSON.stringify(parsedBody));
          });
          break;
        }

        case "/otro": {
          let body = "";
          break;
        }

        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/plain ; charset=utf-8");
          return res.end("404");
      }
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log(`server listening on port http://localhost:1234`);
});
