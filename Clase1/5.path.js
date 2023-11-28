const path = require('node:path')


console.log(path.sep) // Te da el separador de rutas de tu sistema operativo


// Puedes unir rutas con path.join
const filePath = path.join('/content', 'subfolder', 'test.txt')
console.log(filePath) // /content/subfolder/test.txt

// para tener nombre del fichero

const filename = path.basename(filePath) // el segundo parametro es para quitar la extension
console.log(filename) // test.txt


// para tener la extension del fichero
const extension = path.extname('image.jpg')
console.log(extension) // .jpg

