const { Router } = require('express');

const { getPriorities } = require('../controllers/priorities');

const router = Router();

router.get('/', getPriorities );

module.exports = router;