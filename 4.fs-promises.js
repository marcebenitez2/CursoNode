const fs = require("node:fs/promises");

console.log("Leyendo el primer archivo");

fs.readFile("./archivo.txt", "utf-8").then((data) => {
  console.log("Primer texto: ", data);
});

console.log("Haciendo cosas mientras lee archivo");

console.log("Leyendo el segundo archivo");
fs.readFile("./archivo2.txt", "utf-8").then((data) => {
  console.log("Segundo texto: ", data);
});
