// Importa el módulo fs de Node.js para trabajar con el sistema de archivos de manera asíncrona.
const fs = require("node:fs/promises");

// Importa el módulo path de Node.js para manejar y manipular rutas de archivos.
const path = require("node:path");

// Asigna a la variable folder el tercer argumento pasado al script o utiliza "." como valor por defecto (directorio actual).
const folder = process.argv[2] ?? ".";

// Define una función asíncrona llamada ls que toma un parámetro folder (el directorio que se va a listar).
async function ls(folder) {
  // Declara una variable files para almacenar la lista de archivos en el directorio.
  let files;
  try {
    // Intenta leer el contenido del directorio de manera asíncrona.
    files = await fs.readdir(folder);
  } catch {
    // Si hay un error al leer el directorio, imprime un mensaje de error y sale del proceso con código 1.
    console.error(`No se pudo leer el directorio ${folder}`);
    process.exit(1);
  }

  // Utiliza el método map para crear un array de promesas que representan la información de cada archivo en el directorio.
  const filePromises = files.map(async (file) => {
    // Construye la ruta completa del archivo.
    const filePath = path.join(folder, file);
    let stats;
    try {
      // Intenta obtener estadísticas del archivo de manera asíncrona.
      stats = await fs.stat(filePath);
    } catch {
      // Si hay un error al obtener estadísticas del archivo, imprime un mensaje de error y sale del proceso con código 1.
      console.error(`No se pudo leer el archivo ${filePath}`);
      process.exit(1);
    }

    // Determina si el archivo es un directorio o un archivo regular.
    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "DIR" : "FILE";
    const fileSize = stats.size;
    const filemodifiedAt = stats.mtime.toLocaleString();

    // Retorna una cadena formateada con información sobre el archivo.
    return `${fileType} ${file.padEnd(20)} ${fileSize.toString().padStart(10)} ${filemodifiedAt}`;
  });

  // Espera a que todas las promesas se resuelvan y obtiene la información de cada archivo.
  const filesInfo = await Promise.all(filePromises);

  // Imprime la información de cada archivo en la consola.
  filesInfo.forEach((fileInfo) => {
    console.log(fileInfo);
  });
}

// Llama a la función ls con el directorio especificado o el directorio actual si no se proporciona ningún argumento.
ls(folder);
