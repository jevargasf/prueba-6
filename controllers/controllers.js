const express = require('express')
const { access, constants, readFile, readFileSync, writeFile } = require('node:fs');

// ruta json data
const fileUsuarios = './public/data/usuarios.json'
const fileMascotas = './public/data/mascotas.json'

// comprueba que los archivos existen en el directorio
    // data usuarios
access(fileUsuarios, constants.F_OK, (err) => {
    console.log(`${fileUsuarios} ${err ? 'no existe' : 'existe'}`)
})

access(fileUsuarios, constants.R_OK, (err) => {
    console.log(`${fileUsuarios} ${err ? 'no se puede leer' : 'sí se puede leer'}`)
})

access(fileUsuarios, constants.W_OK, (err) => {
    console.log(`${fileUsuarios} ${err ? 'no se puede escribir' : 'sí se puede escribir'}`)
})

    // data mascotas
access(fileMascotas, constants.F_OK, (err) => {
    console.log(`${fileMascotas} ${err ? 'no existe' : 'existe'}`)
})

access(fileMascotas, constants.R_OK, (err) => {
    console.log(`${fileMascotas} ${err ? 'no se puede leer' : 'sí se puede leer'}`)
})

access(fileMascotas, constants.W_OK, (err) => {
    console.log(`${fileMascotas} ${err ? 'no se puede escribir' : 'sí se puede escribir'}`)
})

// json data
const usuariosJson = readFileSync(fileUsuarios, 'utf8', (err, data) => {
    if (err) throw err
    data
    })
const mascotasJson = readFileSync(fileMascotas, 'utf8', (err, data) => {
    if (err) throw err
    data
    })

let usuariosObjeto = JSON.parse(usuariosJson)
let mascotasObjeto = JSON.parse(mascotasJson)


// funciones para servir data
const listarMascotas = (req, res) => {
    let arrData = []
    usuariosObjeto.forEach(usuario => {
        mascotasObjeto.forEach(mascota => {
            if (usuario.id == mascota.idUsuario) {
                arrData.push({
                    rut: usuario.rut,
                    nombre: mascota.nombre
                })
            }
        })
    });
    res.send(arrData)
  }

const servirDatosMascota = (req, res) => {
    res.send("consulta una mascota por nombre");
  }

const servirMascotasUsuario = (req, res) => {
    res.send("consulta todas las mascotas del usuario")
}  

// funciones para postear data
const postMascota = (req, res) => {
    res.send("se agregó correctamente")
}

// funciones para borrar data
const borrarMascota = (req, res) => {
    res.send("se borró correctamente")
}
const borrarMascotas = (req, res) => {
    res.send("se borraron todos los registros")
}

module.exports = { listarMascotas, servirDatosMascota, servirMascotasUsuario, postMascota, borrarMascota, borrarMascotas }