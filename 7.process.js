// Argumentos de entrada
console.log(process.argv)

// Controlar el proceso y su salida
process.exit(0)

// Podemos controlar eventos del proceso
process.on('exit', () => {
    console.log('El proceso va a terminar')
})

// current working directory
console.log(process.cwd())

// Varialbes de entorno
console.log(process.env.HOME)