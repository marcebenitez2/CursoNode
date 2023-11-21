const fs = require('node:fs')


// forma casera de hacer un ls

fs.readdir('.', (err, files) => {
    if (err) {
        console.log(err)
        return
    } 

    files.forEach(file => {
        console.log(file)
    })
})