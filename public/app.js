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
const postRegistro = async () => {
    console.log("posteando nuevo registro")
}

    // borrar mascota por nombre
const borrarMascota = async () => {
    console.log("borrando mascota por nombre")
}
    // borrar todas las mascotas por rut usuario
const borrarPorRut = async () => {
    console.log("borrando todas las mascotas asociadas al rut")
}


// eventos botones
listarRegistros.addEventListener('click', pintarRegistros)
consultaPorNombre.addEventListener('click', consultaMascota)
consultaRut.addEventListener('click', consultaPorRut)
agregarMascota.addEventListener('click', postRegistro)
eliminaMascota.addEventListener('click', borrarMascota)
eliminaPorRut.addEventListener('click', borrarPorRut)
