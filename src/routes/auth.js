const express = require('express');
const {
  signup,
  shouldSignup,
  signin,
  profile,
  details,
  update_Password,
  getuserbyid,
} = require('../controllers/auth');
const {
  validateSignupRequest,
  isRequestValidated,
} = require('../validators/auth');
const { requireSignin } = require('../middlewares');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', signin);
router.post('/change_password', update_Password);
router.get('/profile', requireSignin, profile);
router.get('/shouldSignup', shouldSignup);
router.get('/details/:_id', requireSignin, details);
router.get('/userById/:userId', getuserbyid);

module.exports = router;
