const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const User = require("../models/user");

const getUsers = async (req = request, res = response) => {

    const { limit = 5, from = 1 } = req.query;
    const query = { state: true };

    if (isNaN(+from) || +from < 1) {
        return res.status(400).json({
            msg: 'bad request - from must be an integer stating from 1'
        });
    }

    if (isNaN(+limit) || +limit < 1) {
        return res.status(400).json({
            msg: 'bad request - limit must be an integer stating from 1'
        });
    }

    try {

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(from - 1))
                .limit(Number(limit))
        ])

        res.json({
            total,
            users
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Unexpected error',
            error: error.error,
        })
    }
}

const createUser = async (req, res = response) => {

    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    try {

        await user.save();

        res.json({
            user
        });

    } catch (error) {

        console.log(error);
        res.status(409).json({
            msg: 'Unexpected error',
            error: error.error,
        })
    }
}

const updateUser = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, email, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    try {

        const user = await User.findByIdAndUpdate(id, resto, { new: true });

        res.json(user);

    } catch (error) {

        console.log(error);
        res.status(409).json({
            msg: 'Unexpected error',
            error: error.error,
        })
    }
}

const deleteUser = async (req, res = response) => {

    const { id } = req.params;

    try {

        const user = await User.findByIdAndUpdate(id, { state: false });

        res.json({
            user
        });

    } catch (error) {

        console.log(error);
        res.status(409).json({
            msg: 'Unexpected error',
            error: error.error,
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}