const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getAll);
router.get('/:cpf', clienteController.getById);
router.post('/', clienteController.create);
router.put('/:cpf', clienteController.update);
router.delete('/:cpf', clienteController.remove);

module.exports = router;