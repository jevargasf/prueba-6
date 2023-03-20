const express = require('express');
const port = 8000
const router = require('./routes/routes.js')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();

// middlewares
app.use(cors())
app.use(bodyParser.json())

// Definir rutas de las páginas de la aplicación
app.use('/', router)

// servir archivos estáticos desde public
app.use(express.static("public"));

// escucha de puerto
app.listen(port, () => {
    console.log('Escuchando en el puerto 8000')
});