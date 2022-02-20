const { Router } = require('express');

const { getUsers,
        updateUsers,
        createUsers,
        patchUsers, 
        deleteUsers} = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.put('/:id', updateUsers);

router.post('/', createUsers);

router.patch('/', patchUsers);

router.delete('/', deleteUsers);

module.exports = router;