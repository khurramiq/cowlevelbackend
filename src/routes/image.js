const express = require('express');
const {
  createImage,
  updateImage,
  getAllRecord,
  deleteImage,
} = require('../controllers/image');
const router = express.Router();

router.post('/create', createImage);
router.post('/update', updateImage);
router.get('/', getAllRecord);
router.delete('/:imageId', deleteImage);

module.exports = router;
