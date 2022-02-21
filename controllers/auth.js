const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require('../models/user');

const { generateJWT } = require("../helpers/generate-jwt");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                msg: 'Wrong username/password'
            });
        }

        if ( !user.state ) {
            return res.status(400).json({
                msg: 'wrong username/password'
            });
        }

        const validPassword = bcryptjs.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'wrong username/password'
            });
        } 

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: 'Unexpected error, please try again'
        })
    }
}

module.exports = {
    login
}