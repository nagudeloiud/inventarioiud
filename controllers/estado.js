
const { request, response } = require('express');
const Estado = require('../models/estado');


/**
 * crea un estado
 */
 const createEstado = async (req = request, res = response) => {
    try{
        const nombre = req.body.nombre.toUpperCase();
        const estadoBD = await Estado.findOne({ nombre });
        if(estadoBD){
            return res.status(400).json({msg: 'Ya existe estado'});
        }
        const datos = {
            nombre
        };
        const estado = new Estado(datos); 
        await estado.save();
        res.status(201).json(estado);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}


/**
 * Consultar todos estados activos
 */
const getEstados = async (req, res = response) => {
    try{
        const query = { estado: true}; // estado del equipo
        const estadosBD = await Estado.find(query);
        res.json(estadosBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar un ESTADO por Id
 */
const getEstadoById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const query = { estado: true, _id: id}; 
        const estadosBD = await Estado.findOne(query);
        res.json(estadosBD);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}



/**
 * Actualiza un estado por su ID
 */
const updateEstadoById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        // const { nombre, ...data } = req.body;// destructuring, spread (...)
        data = req.body;  // para poder modificar el nombre
        const estadoBD = await Estado.findOne({ _id: id });
    
        if(!estadoBD){
            return res.status(404).json({
                msj: 'No existe estado'
            });
        }
        data.fechaCreacion = estadoBD.fechaCreacion;
        data.fechaActualizacion = new Date();
        const estado = await Estado.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(estado);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}


/**
 * Borrar un estado por su ID
 */
 const deleteEstadoById = async (req = request, res = response) => {
    // try- catch
    const id = req.params.id;
    const estado = await Estado.findByIdAndDelete(id);
    res.status(204).json(estado);
}



module.exports = { createEstado, getEstados, getEstadoById,  updateEstadoById, deleteEstadoById };