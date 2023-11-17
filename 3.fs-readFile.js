const fs = require("node:fs");

console.log("Leyendo el primer archivo");
fs.readFile("./archivo.txt", "utf-8", (err, data) => {
  console.log(data);
});

console.log("Haciendo cosas mientras lee archivo");

console.log("Leyendo el segundo archivo");
fs.readFile("./archivo2.txt", "utf-8", (err, data) => {
  console.log(data);
});
