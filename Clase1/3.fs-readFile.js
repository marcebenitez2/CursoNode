// Es metodo e sincrono, se ejecuta una linea a la vez


const fs = require("node:fs");

console.log("Leyendo el primer archivo");
const data = fs.readFileSync("./archivo.txt", "utf-8");
console.log(data);

console.log("Haciendo cosas mientras lee archivo");

console.log("Leyendo el segundo archivo");
const data2 = fs.readFileSync("./archivo2.txt", "utf-8");
console.log(data2);