const { Router } = require('express');
const { createEstado, getEstados, getEstadoById, updateEstadoById, deleteEstadoById } = require('../controllers/estado');

const router = Router();


/**
 * Crear un estado
 */
 router.post('/', createEstado);


/**
 * Obtiene todos los estados activos
 */
router.get('/', getEstados);

/**
 * Obtiene un estado por id
 */
 router.get('/:id', getEstadoById);


/**
 * Actualiza un estado por id
 */
router.put('/:id', updateEstadoById);

/**
 * Actualiza un estado por id
 */
 router.delete('/:id', deleteEstadoById);


module.exports = router;