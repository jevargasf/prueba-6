
// Inicialización elementos DOM
const contenedorData = document.getElementById("contenedorData")
const listarRegistros = document.getElementById("listarRegistros")
const consultaPorNombre = document.getElementById("consultaPorNombre")
const consultaRut = document.getElementById("consultaRut")
const agregarMascota = document.getElementById("agregarMascota")
const eliminaMascota = document.getElementById("eliminaMascota")
const eliminaPorRut = document.getElementById("eliminaPorRut")


// AJAX con Axios
    // listar todas las mascotas con su dueño
const pintarRegistros = async () => {
    try {
        const res = await axios('http://localhost:8000/')
        contenedorData.innerHTML=`
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Rut</th>
                    <th scope="col">Nombre Mascota</th>
                </tr>
            </thead>
            <tbody id="cuerpoTabla">
            </tbody>
            </table>
        `
        const cuerpoTabla = document.getElementById("cuerpoTabla")
        res.data.forEach(data => {
            const fila = document.createElement("tr")
            fila.innerHTML += `
                <td>${data.rut}</td>
                <td>${data.nombre}</td>
            `
            cuerpoTabla.appendChild(fila)
        });
    } catch (err) {
        console.log('Error: ', err)
    }
}

    // consultar por nombre de mascota
const consultaMascota = async () => {
    try {
        const consulta = prompt("Ingrese nombre de la mascota: ")
        const res = await axios(`http://localhost:8000/mascotas/${consulta}`)
           contenedorData.innerHTML=`
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Rut</th>
                        <th scope="col">Nombre Mascota</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTabla">
                </tbody>
                </table>
            `

        // validación nombre mascota
        while (res.data.length === 0) {
            alert("Nombre no encontrado. Revise que el nombre exista en la lista de registros e intente nuevamente.")
            console.log("se interrumpió el programa")
            contenedorData.setAttribute("class", "col-5 container p-3 m-auto text-center")
            contenedorData.innerHTML=`
                <h5 class="text-center">Consulta no realizada. Puede encontrar la lista de mascotas y usuarios en nuestro directorio de registros.</h5>
            `
            break
        }
    
        // pintar data en DOM
        const cuerpoTabla = document.getElementById("cuerpoTabla")
        res.data.forEach(data => {
            const fila = document.createElement("tr")
            fila.innerHTML += `
                <td>${data.rut}</td>
                <td>${data.nombre}</td>
            `
            cuerpoTabla.appendChild(fila)
        })  
    } catch (err) {
        console.log('Error: ', err)
    }
}

    // consultar mascotas por rut usuario
const consultaPorRut = async () => {
    try {
        const consulta = prompt("Ingrese RUN del usuario: ")
        const res = await axios(`http://localhost:8000/usuarios/${consulta}`)
           contenedorData.innerHTML=`
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Run</th>
                        <th scope="col">Nombre Mascota</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTabla">
                </tbody>
                </table>
            `

        // validación nombre mascota
        while (res.data.length === 0) {
            alert("RUN incorrecto. Revise que el RUN exista en la lista de registros e intente nuevamente.")
            contenedorData.setAttribute("class", "col-5 container p-3 m-auto text-center")
            contenedorData.innerHTML=`
                <h5 class="text-center">Consulta no realizada. Puede encontrar la lista de usuarios en nuestro directorio de registros.</h5>
            `
            break
        }
    
        // pintar data en DOM
        const cuerpoTabla = document.getElementById("cuerpoTabla")
        res.data.forEach(data => {
            const fila = document.createElement("tr")
            fila.innerHTML += `
                <td>${data.rut}</td>
                <td>${data.nombre}</td>
            `
            cuerpoTabla.appendChild(fila)
        })  
    } catch (err) {
        console.log('Error: ', err)
    }
}

    // postear registro
const pintarPost = async () => {
    
        // pintar formulario para enviar data
        contenedorData.innerHTML = `
            <form id="formularioPost">
                <div class="form-group">
                    <label for="rut">RUN Dueño sin puntos con guión. Ej.: 11222333-4</label>
                    <input type="text" class="form-control" id="rut" name="rut" aria-describedby="rut" placeholder="Ingrese RUN del dueño" required pattern="^[0-9]+-[0-9kK]{1}$">
                </div>
                <div class="form-group">
                    <label for="nombre">Nombre Mascota</label>
                    <input type="text" class="form-control" id="nombre" aria-describedby="nombre" placeholder="Ingrese nombre mascota" required>
                </div>
                <button type="submit" class="btn btn-primary" id="botonEnviar">Enviar</button>
            </form>
        `

}

const btnPost = async (e) => {
    try {
        e.preventDefault()
        const inputRut = document.getElementById("rut")
        const inputNombre = document.getElementById("nombre")
        // validación rut
        while (inputRut.value.length > 10 && inputRut.value.length < 10) {
            alert("RUN no válido. Por favor, ingresa nuevamente.")
            break
        }

        // envía rut y nombre mascota, backend comprueba si el rut existe o no
        const res = await axios({
            method: 'post',
            url: `http://localhost:8000/mascotas/crear`,
            data: {
                rut: inputRut.value,
                nombre: inputNombre.value
            }
        })
        alert(res.data.mensaje)
    } catch (err) {
        console.log('Error:', err)
    }
}

    // borrar mascota por nombre
const pintarBorrarMascota = async () => {
    // pintar formulario para enviar data
    contenedorData.innerHTML = `
    <h5 class="text-center my-3 py-3">Ingrese el nombre de la mascota de que desea borrar y RUN del dueño.</h5>
    <form id="formularioDelete">
        <div class="form-group">
            <label for="rut">RUN Dueño sin puntos con guión. Ej.: 11222333-4</label>
            <input type="text" class="form-control" id="rut" name="rut" aria-describedby="rut" placeholder="Ingrese RUN del dueño." required pattern="^[0-9]+-[0-9kK]{1}$">
        </div>
        <div class="form-group">
            <label for="nombre">Nombre Mascota</label>
            <input type="text" class="form-control" id="nombre" aria-describedby="nombre" placeholder="Ingrese nombre mascota" required>
        </div>
        <button type="submit" class="btn btn-primary">Borrar Registro</button>
    </form>
`
}

const borrarMascota = async (e) => {
    try {
    e.preventDefault()
    // envía rut y nombre mascota, backend comprueba si el rut existe o no
    const inputRut = document.getElementById("rut")
    const inputNombre = document.getElementById("nombre")
    const res = await axios({
        method: 'delete',
        url: `http://localhost:8000/mascotas/${inputNombre.value}`,
        data: {
            rut: inputRut.value,
            nombre: inputNombre.value
        }
    })
    alert(res.data.mensaje)
    } catch (err) {
        console.log('Error:', err)
    }
}

    // borrar todas las mascotas por rut usuario
const pintarBorrarPorRut = async () => {
    // pintar formulario para enviar data
    contenedorData.innerHTML = `
    <h5 class="text-center my-3 py-3">Ingrese el RUN del dueño para borrar todas sus mascotas registradas.</h5>
    <form id="formularioDelete">
        <div class="form-group">
            <label for="rut">RUN Dueño sin puntos con guión. Ej.: 11222333-4</label>
            <input type="text" class="form-control" id="rut" name="rut" aria-describedby="rut" placeholder="Ingrese RUN del dueño" required pattern="^[0-9]+-[0-9kK]{1}$">
        </div>
        <button type="submit" class="btn btn-primary">Borrar Todos los Registros</button>
    </form>
    `
}

const borrarPorRut = async (e) => {
    try {
        e.preventDefault()
        // envía rut y nombre mascota, backend comprueba si el rut existe o no
        const inputRut = document.getElementById("rut")
        const res = await axios({
            method: 'delete',
            url: `http://localhost:8000/usuarios/${inputRut.value}`
        })
        alert(res.data.mensaje)
        } catch (err) {
            console.log('Error:', err)
        }
}


// eventos botones
listarRegistros.addEventListener('click', pintarRegistros)
consultaPorNombre.addEventListener('click', consultaMascota)
consultaRut.addEventListener('click', consultaPorRut)
agregarMascota.addEventListener('click', (e) => {
    pintarPost();
    document.getElementById("formularioPost").addEventListener('submit', e => btnPost(e))
})
eliminaMascota.addEventListener('click', (e) => {
    pintarBorrarMascota();
    document.getElementById("formularioDelete").addEventListener('submit', e => borrarMascota(e))
})
eliminaPorRut.addEventListener('click', (e) => {
    pintarBorrarPorRut();
    document.getElementById("formularioDelete").addEventListener('submit', e => borrarPorRut(e))
})

