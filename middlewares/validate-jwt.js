const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No token provided'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const authenticatedUser = await User.findById(uid);

        if ( !authenticatedUser ) {
            return res.status(401).json({
                msg: 'Invalid token'
            })
        }

        if ( !authenticatedUser.state ) {
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }

        req.usuarioAuth = authenticatedUser;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    validateJWT
}