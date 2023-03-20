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
    // INNER JOIN de archivos json
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
    
    // consulta get con parámetro
    let respuesta = []
    arrData.forEach(registro => {
        if(registro.nombre == req.params.nombre) {
            respuesta.push(registro)
        }
    })

    // respuesta servidor
    res.send(respuesta);
  }

const servirMascotasUsuario = (req, res) => {
    // INNER JOIN de archivos json
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

    // consulta get con parámetro
    let respuesta = []
    arrData.forEach(registro => {
        if(registro.rut == req.params.rut) {
            respuesta.push(registro)
        }
    })
    res.send(respuesta)
}  

// funciones para postear data
const postMascota = (req, res) => {
    try {
        // recibir datos del body
        const data = req.body

        // programa para validar los datos en la base
            // INNER JOIN de archivos json
        let arrData = []
        usuariosObjeto.forEach(usuario => {
            mascotasObjeto.forEach(mascota => {
                if (usuario.id == mascota.idUsuario) {
                    arrData.push({ rut: usuario.rut, nombre: mascota.nombre })
                }
            })
        });

        // registro de mascota ya existe en la base de datos
        if (arrData.filter(registro => registro.rut === data.rut && registro.nombre === data.nombre).length > 0) {
            console.log(true)
            res.json({ mensaje: "El registro ya existe en la base de datos."})

        // registro nueva mascota para usuario existente
        } else if (usuariosObjeto.some(usuario => usuario.rut == data.rut)) {
            let idActualizar = null
            usuariosObjeto.forEach(usuario => {
                if(usuario.rut == data.rut) {
                    idActualizar = usuario.id
                }
            })
                        
            // crear objeto data con nueva mascota para usuario existente
            nuevaMascota = {
                idUsuario: idActualizar,
                nombre: data.nombre
            }
            // escribir json con file system
            mascotasObjeto.push(nuevaMascota)
            writeFile(fileMascotas, JSON.stringify(mascotasObjeto, 0, 4), (err) => {
                if (err)
                console.log(err);
                else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                console.log(readFileSync(fileMascotas, "utf8"));
                }
            });
            res.send("se agregó correctamente")

        // registro de nuevo usuario y nueva mascota
        } else {        
            // nuevo id registro
            let arrId = []
            usuariosObjeto.forEach(usuario => {
                arrId.push(usuario.id)
            })
            const nuevoId = ++arrId.length

            // crear objetos con nueva data para cada json
            nuevoUsuario = {
                id: nuevoId,
                rut: data.rut
            } 
            nuevaMascota = {
                idUsuario: nuevoId,
                nombre: data.nombre
            }

            // escribir json con file system
            usuariosObjeto.push(nuevoUsuario)
            writeFile(fileUsuarios, JSON.stringify(usuariosObjeto, 0, 4), (err) => {
                if (err)
                console.log(err);
                else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                console.log(readFileSync(fileUsuarios, "utf8"));
                }
            });

            mascotasObjeto.push(nuevaMascota)
            writeFile(fileMascotas, JSON.stringify(mascotasObjeto, 0, 4), (err) => {
                if (err)
                console.log(err);
                else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                console.log(readFileSync(fileMascotas, "utf8"));
                }
            });
            res.send("se agregó correctamente")
        }
    } catch (err) {
        console.log('Error: ', err)
    }

}

// funciones para borrar data
const borrarMascota = (req, res) => {
    try {
        // encontrar id a borrar en json data mascotas y data usuario
        let mascotaBorrar = null
        mascotasObjeto.forEach(mascota => {
            if (mascota.nombre == req.params.nombre) {
                mascotaBorrar = mascota
                console.log("mascota a borrar: ", mascotaBorrar)
            }
        })

        // borrar mascota del registro 
        let arrNuevo = mascotasObjeto.filter(mascota =>
            mascota != mascotaBorrar
        )
        console.log(arrNuevo)
        writeFile(fileMascotas, JSON.stringify(arrNuevo, 0, 4), (err) => {
            if (err)
            console.log(err);
            else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(readFileSync(fileMascotas, "utf8"));
            }
        });

        res.send("se borró correctamente")
    } catch (err) {
        console.log('Error: ', err)
    }
}

const borrarMascotasRut = (req, res) => {
    try {
    // encontrar id asociado al rut
    let idBorrar = null
    usuariosObjeto.forEach(usuario => {
        if (usuario.rut == req.params.rut) {
            idBorrar = usuario.id
        }
    })
    // borrar registros asociados a idUsuario
    let arrNuevo = []
    mascotasObjeto.forEach(mascota => {
        if (mascota.idUsuario != idBorrar) {
            arrNuevo.push(mascota)
        }
    })

    // reescribir archivo json mascotas
    writeFile(fileMascotas, JSON.stringify(arrNuevo, 0, 4), (err) => {
        if (err)
        console.log(err);
        else {
        console.log("File written successfully\n");
        console.log("The written has the following contents:");
        console.log(readFileSync(fileMascotas, "utf8"));
        }
    });
    res.send("se borraron todos los registros")
    } catch (err) {
        console.log('Error: ', err)
    }
}

module.exports = { listarMascotas, servirDatosMascota, servirMascotasUsuario, postMascota, borrarMascota, borrarMascotasRut }