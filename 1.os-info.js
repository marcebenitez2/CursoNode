const os = require('node:os');

console.log('Informacion del sistema operativo');
console.log('----------------------------------');

console.log('Nombre del sistema oppertativo: ', os.platform());
console.log('Version del sistema operativo: ', os.release());
console.log('Memoria total (bytes): ', os.totalmem() / 1024 / 1024 / 1024);
console.log('Memoria libre (bytes): ', os.freemem()/ 1024 / 1024 / 1024);
console.log('Arquitectura del sistema: ', os.arch());
console.log('CPUs', os.cpus());  
console.log('uptime', os.uptime()/60/60);