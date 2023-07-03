const SignupForm = require('../models/signupForm');

exports.createSignupForm = async (req, res) => {
  try {
    // const userId = req.token._id;
    const savedSignupForm = await SignupForm.create(req.body);
    res.status(200).json({ savedSignupForm });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getSignupFormById = async (req, res) => {
  try {
    // const userId = req.token._id;
    const { signupFormId } = req.params;
    const signupForm = await SignupForm.getById(signupFormId);
    res.status(200).json({ signupForm });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getAllRecord = async (req, res) => {
  try {
    const items = await SignupForm.getAll();
    res.status(200).json({ items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.updateSignupForm = async (req, res) => {
  try {
    const _id = req.body._id;
    const updatedSignupForm = await SignupForm.updateById(_id, req.body);
    res.status(200).json({ updatedSignupForm });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteSignupForm = async (req, res) => {
  try {
    const { signupFormId } = req.params;
    await SignupForm.deleteItem(signupFormId);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
