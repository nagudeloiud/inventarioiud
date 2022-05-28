const { Router } = require('express');
const { getInventarios, getInventarioByID, createInventario, updateInventario, uploadImage,
getFotoById} = require('../controllers/inventario');

const router = Router();

/**
 * Crear un inventario
 */
 router.post('/', createInventario);

/**
 * Obtiene todos los inventarios
 */
router.get('/', getInventarios);

/**
 * Obtiene un inventario por id
 */
 router.get('/:id', getInventarioByID);


/**
 * Actualiza un inventario por id
 */
router.put('/:id', updateInventario);

/**
 * Sube foto el inventario
 */
router.post('/:id/upload-image', uploadImage);

/**
 * get foto de inventario
 */
router.get('/:id/image', getFotoById);

module.exports = router;