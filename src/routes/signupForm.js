const express = require('express');
const {
  createSignupForm,
  getSignupFormById,
  updateSignupForm,
  getAllRecord,
  deleteSignupForm,
} = require('../controllers/signupForm');
const router = express.Router();

router.post('/create', createSignupForm);
router.post('/update', updateSignupForm);
router.get('/', getAllRecord);
router.get('/:signupFormId', getSignupFormById);
router.delete('/:signupFormId', deleteSignupForm);

module.exports = router;
