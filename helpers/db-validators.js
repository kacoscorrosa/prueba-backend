const User = require('../models/user');
const Task = require('../models/task');

const {  prioritiesNotExist } = require('./utils');

const emailExiste = async(email = '') => {

    const existeEmail = await User.findOne({ email });

    if ( existeEmail ) {

        throw new Error(`The email ---${email}--- is already taken`);
    } 
}

const existeUserById = async( id ) => {

    const existeUser = await User.findById(id);

    if ( !existeUser ) {
        
        throw new Error(`User ${id} does not exist`);
    } 
}

const validatePriority = async( priority = '') => {

    const error = await prioritiesNotExist(priority);

    if ( error ) {
        throw new Error(error)
    }
}

const existeTaskById = async( id ) => {

    const existeTasks = await Task.findById(id);

    if ( !existeTasks ) {
        
        throw new Error(`${id} does not exist`);
    } 
}

module.exports = {
    emailExiste,
    existeUserById,
    validatePriority,
    existeTaskById
}