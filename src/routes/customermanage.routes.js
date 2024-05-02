const express = require('express');
const router = express.Router();
const customermanageController = require('../app/controllers/CustomermanageController');

//route phải khớp từ trên xuống nên route gốc phải để dưới cùng
router.post('/create', customermanageController.create);
router.post('/:id/update', customermanageController.update);
router.get('/:id/edit', customermanageController.getbyId);
router.use('/', customermanageController.index);
module.exports = router;