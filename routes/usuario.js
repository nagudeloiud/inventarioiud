const { Router } = require('express');

const router = Router();

const { getUsuarios, getUsuarioById, updateUsuarioById, createUsuario, deleteUsuarioById } = require('../controllers/usuario');


/**
 * Crear un usuario
 */
 router.post('/', createUsuario);


/**
 * Obtiene todos los usuarios activos
 */
router.get('/', getUsuarios);

/**
 * Obtiene un usuario por id
 */
 router.get('/:id', getUsuarioById);


/**
 * Actualiza un usuario por id
 */
router.put('/:id', updateUsuarioById);

/**
 * Actualiza una parte del usuario
 */
router.patch('/:id', (req, res) => {
    res.json({});
});

/**
 * Borra un usuario por id
 */
 router.delete('/:id', deleteUsuarioById);

module.exports = router;