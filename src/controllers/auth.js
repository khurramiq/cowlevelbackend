const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = { email, password };
    var user = await User.findUserByEmail(email);
    if (!user) {
      user = await User.create(userData);
      var token = await user.generateAuthToken();
      res.status(200).json({ token: token });
    } else res.json({ error: 'User with this email is already registered.' });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
exports.shouldSignup = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.status(200).json({ shouldSignup: false });
    } else res.status(200).json({ shouldSignup: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    var user = await User.findUserByCredentials(email, password);
    if (!user) return res.json({ error: 'Email or password is incorrect' });
    else {
      var token = await user.generateAuthToken();
      res.status(200).json({ token: token });
    }
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.profile = async (req, res) => {
  try {
    var user = await User.getUserById(req.token._id);
    if (!user) return res.json({ error: 'User is not registered' });
    res.status(200).json({ user: user });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getuserbyid = async (req, res) => {
  try {
    var user = await User.getUserById(req.params.userId);
    if (!user) return res.json({ error: 'User is not registered' });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.update_Password = async (req, res) => {
  try {
    var { email, password } = req.body;
    var user = await User.findUserByEmail(email);
    var _user = await User.updatePassword(user._id, password);
    // Generate Notification for Reset Password
    let notification = {
      title: 'Password Reset Notification',
      text: 'We noticed the password for your account was recently changed. If this was you, you can safely disregard this message. If you are not aware of the change, please, contact us as soon as possible.',
      count: 1,
      date: new Date(),
    };
    await User.addNotification(user._id, notification);
    res.status(200).json({ passwordChanged: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.details = async (req, res) => {
  try {
    var user = await User.getUserById(req.params._id);
    if (!user) return res.json({ error: 'User is not registered' });
    res.status(200).json({ user: user });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
