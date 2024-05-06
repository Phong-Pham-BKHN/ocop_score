const express = require('express');
const router = express.Router();
const productmanageController = require('../app/controllers/ProductmanageController');

//route phải khớp từ trên xuống nên route gốc phải để dưới cùng
router.post('/create', productmanageController.create);
router.delete('/:id', productmanageController.delete);
router.post('/:id/update', productmanageController.update);
router.get('/:id/edit', productmanageController.getbyId);
router.use('/', productmanageController.index);
module.exports = router;