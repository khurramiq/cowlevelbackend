const express = require('express');
const {
  createInvestForm,
  getInvestFormById,
  updateInvestForm,
  getAllRecord,
  deleteInvestForm,
} = require('../controllers/investForm');
const router = express.Router();

router.post('/create', createInvestForm);
router.post('/update', updateInvestForm);
router.get('/', getAllRecord);
router.get('/:investFormId', getInvestFormById);
router.delete('/:signupFormId', deleteInvestForm);

module.exports = router;
