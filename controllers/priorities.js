const { response } = require("express");

const Priority = require('../models/priority');

const getPriorities = async(req, res = response) => {

    try {

        const priorities = await Priority.find();
    
        res.json(priorities);
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Unexpected error',
            error: error.error,
        });
    }
}

module.exports = {
    getPriorities
}