const { response, request } = require("express")

const getUsers = (req = request, res = response) => {

    const { q, nombre = 'no name', apikey, page, limit } = req.query;

    res.status(200).json({
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const updateUsers = (req, res = response) => {

    const { id } = req.params;

    res.json({
        id
    })
}

const createUsers = (req, res = response) => {

    const body = req.body;

    res.json({
        body
    })
}

const patchUsers = (req, res = response) => {
    res.status(200).json({
        msg: 'patch API'
    })
}

const deleteUsers = (req, res = response) => {
    res.status(200).json({
        msg: 'delete API'
    })
}

module.exports = {
    getUsers,
    updateUsers,
    createUsers,
    patchUsers,
    deleteUsers
}