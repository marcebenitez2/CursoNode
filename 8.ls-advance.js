const fs = require("node:fs/promises");
const path = require("node:path");

const folder = process.argv[2] ?? ".";

async function ls(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch {
    console.error(`No se pudo leer el directorio ${folder}`);
    process.exit(1);
  }

  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch {
      console.error(`No se pudo leer el archivo ${filePath}`);
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "DIR" : "FILE";
    const fileSize = stats.size;
    const filemodifiedAt = stats.mtime.toLocaleString();

    return `${fileType} ${file} ${fileSize.toString()} ${filemodifiedAt}`;
  });

  const filesInfo = await Promise.all(filePromises);

  filesInfo.forEach((fileInfo) => {
    console.log(fileInfo);
  });
}

ls(folder);
