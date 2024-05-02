const express = require('express');
const router = express.Router();
const customermanageController = require('../app/controllers/CustomermanageController');

//route phải khớp từ trên xuống nên route gốc phải để dưới cùng
// router.get('/', customermanageController.customermanage);
router.use('/', customermanageController.index);
router.post('/create', customermanageController.create);
router.get('/:id/edit', customermanageController.getbyId);

module.exports = router;