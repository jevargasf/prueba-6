const express = require('express');
const router = express.Router();
const { listarMascotas, servirDatosMascota, servirMascotasUsuario, postMascota, borrarMascota, borrarMascotasRut } = require('../controllers/controllers.js')

// Rutas para manejar consultas
router.get('/', listarMascotas);

router.get('/mascotas/:nombre', servirDatosMascota);

router.get('/usuarios/:rut', servirMascotasUsuario);

router.post('/mascotas/crear', postMascota);

router.delete('/mascotas/:nombre', borrarMascota);

router.delete('/usuarios/:rut', borrarMascotasRut);

module.exports = router;