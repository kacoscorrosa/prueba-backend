const { Router } = require('express');
const { check } = require('express-validator');

const { createTask,
        getTasks,
        modifyTask, 
        patchTaskComplete,
        deleteTask} = require('../controllers/tasks');

const { validatePriority, existeTaskById } = require('../helpers/db-validators');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/',[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('priority', 'Priority is required').not().isEmpty(),
    check('priority').custom( validatePriority ),
    validateFields
], createTask );

router.get('/', validateJWT, getTasks );

router.put('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existeTaskById ),
    validateFields
], modifyTask );

router.patch('/completed/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existeTaskById ),
    check('completed', 'Completed is required').not().isEmpty(),
    check('completed', 'Completed must be Boolean').isBoolean(),
    validateFields
], patchTaskComplete ),


router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existeTaskById ),
    validateFields
], deleteTask );

module.exports = router;