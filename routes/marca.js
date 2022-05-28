const { Router } = require('express');
const { getMarcas, getMarcaById, createMarca, updateMarcaById, deleteMarcaById} = require('../controllers/marca');

const router = Router();

/**
 * Obtiene todos las marcas activos
 */
router.get('/', getMarcas);

/**
 * Obtiene una marca por id
 */
 router.get('/:id', getMarcaById);

/**
 * Crear una marca
 */
router.post('/', createMarca);

/**
 * Actualiza una marca por id
 */
router.put('/:id', updateMarcaById);


/**
 * Borrar una marca por id
 */
 router.delete('/:id', deleteMarcaById);

module.exports = router;