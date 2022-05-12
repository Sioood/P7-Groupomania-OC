const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');

router.post('/create', postCtrl.create)
router.get('/', postCtrl.getAll)
router.post('/:id', postCtrl.getOne);
router.put('/update', postCtrl.updateOne);
router.delete('/delete', postCtrl.deleteOne);

module.exports = router;