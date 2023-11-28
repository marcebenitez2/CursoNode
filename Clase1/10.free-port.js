// En tu archivo "10.free-port.js"
const net = require("node:net"); // protocolo tcp

function findAvailablePort(puertoDeseado) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(puertoDeseado, () => {
      const { port } = server.address();
      server.close(() => {
        resolve(port);
      });
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        findAvailablePort(0).then((port) => resolve(port));
      } else {
        reject(err);
      }
    });
  });
}

module.exports = { findAvailablePort };
