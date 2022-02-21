const { Router } = require('express');

const { getPriorities } = require('../controllers/priorities');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getPriorities );

module.exports = router;