const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.get('/create', postCtrl.create)
router.get('/', postCtrl.getAll)
router.post('/:id', postCtrl.getOne);
// router.post('/update', postCtrl.updateOne);
// router.post('/delete', postCtrl.deleteOne);

module.exports = router;