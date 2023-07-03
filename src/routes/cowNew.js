const express = require('express');
const {
  createCowNew,
  getCowNewById,
  updateCowNew,
  commentOnNews,
  getAllRecord,
  deleteCowNew,
} = require('../controllers/cowNew');
const router = express.Router();

router.post('/create', createCowNew);
router.post('/update', updateCowNew);
router.post('/comment', commentOnNews);
router.get('/', getAllRecord);
router.get('/:cowNewId', getCowNewById);
router.delete('/:cowNewId', deleteCowNew);

module.exports = router;
