const express = require('express');
const router = express.Router();
const customermanageController = require('../app/controllers/CustomermanageController');
const upload = require('../app/Middleware/uploadMiddle');

//route phải khớp từ trên xuống nên route gốc phải để dưới cùng
router.post('/create', customermanageController.create);
router.delete('/:id', customermanageController.delete);
router.post('/:id/update', customermanageController.update);
router.put('/:id', upload.single('file'));
router.get('/:id/edit', customermanageController.getbyId);
router.use('/', customermanageController.index);
module.exports = router;