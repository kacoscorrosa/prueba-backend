const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers,
        updateUser,
        createUser,
        deleteUser } = require('../controllers/users');

const { emailExiste, existeUserById } = require('../helpers/db-validators');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);

router.put('/:id',[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existeUserById ),
    validateFields
], updateUser );

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( emailExiste ),
    check('password', 'Password must contain at least 6 digits').isLength({ min: 6 }),
    validateFields,
], createUser);

router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existeUserById ),
    validateFields
], deleteUser);

module.exports = router;