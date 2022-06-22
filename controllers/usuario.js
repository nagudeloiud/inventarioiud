const { request, response } = require('express');
const Usuario = require('../models/usuario');


/**
 * Crear usuario
 */
/* const createUsuario = async (req = request, res = response) => {
    try{
        const body = req.body;
        const usuario = new Usuario( body )
        await usuario.save();
        res.json(usuario);
    }catch(e){
        return res.status(500).json({error: e});
    }
} */


const createUsuario = async (req = request, res = response) => {
    try{
        const nombre = req.body.nombre;
        const email  = req.body.email;
        const usuarioBD = await Usuario.findOne({ email });
        if(usuarioBD){
            return res.status(400).json({msg: 'Ya existe usuario'});
        }
        const datos = {
            nombre,
            email
        };
        const usuario = new Usuario(datos); 
        await usuario.save();
        res.status(201).json(usuario);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}


/**
 * Consultar todos los usuarios activos
 */
 const getUsuarios = async (req, res = response) => {
    try{
        const query = { estado: true};
        const usuariosBD = await Usuario.find(query);
        res.json(usuariosBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar un usuario por Id
 */
 const getUsuarioById = async (req = request, res = response) => {
    try{
        const id  = req.params.id;
        console.log('getUsuarioById: ',id)
        const query = { _id: id };
        const usuario = await Usuario.findOne(query);
        res.json(usuario);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}

/**
 * Actualiza un usuario por su ID
 */
const updateUsuarioById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        //const { nombre, ...data } = req.body;// destructuring, spread (...)
        const  data  = req.body;
    
        const usuarioBD = await Usuario.findOne({ _id: id });
    
        if(!usuarioBD){
            return res.status(404).json({
                msj: 'No existe usuario'
            });
        }
        //Se pueden hacer validaciones de si un usuario tiene equipos asignados, no se puede cambiar el email.
        //Si el nuevo email, ya existe no se puede actualizar. Cosas asi. O hacer otros análisis.
        console.log(usuarioBD);
        console.log(data);
        data.fechaCreacion = usuarioBD.fechaCreacion;
        data.fechaActualizacion = new Date();
        const usuario = await Usuario.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(usuario);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * Borrar un usuario por su ID
 */
 const deleteUsuarioById = async (req = request, res = response) => {
    // try- catch
    const id = req.params.id;
    const usuario = await Usuario.findByIdAndDelete(id);
    res.status(204).json(usuario);
}



module.exports = { createUsuario, getUsuarios, getUsuarioById, updateUsuarioById, deleteUsuarioById  };