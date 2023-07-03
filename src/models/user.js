const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create Schema
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
});

//Store Encrypted Password When Creating Account
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 10);
  next();
});

//Generate JWT Token
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
  return token;
};

//Generate JWT Token For Remember Me
UserSchema.methods.generateAuthTokenForRememberMe = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: '365d',
    }
  );
  return token;
};

//Find using email and check if the password matched
UserSchema.statics.findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ email }, { _id: 1, password: 1 });
  if (!user) throw new Error('Invalid login credentials');
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) throw new Error('Invalid login credentials');
  return user;
};

UserSchema.statics.findUserByEmail = async (email) => {
  const user = await User.findOne({ email }, { password: 0 });
  return user;
};

UserSchema.statics.getUserById = async (_id) => {
  const user = await User.findOne(
    { _id: mongoose.Types.ObjectId(_id) },
    { password: 0 }
  );
  return user;
};

UserSchema.statics.getAllUser = async (_id) => {
  const user = await User.find({});
  return user;
};

UserSchema.statics.deleteUser = async (_id) => {
  const del = await User.deleteOne({ _id: mongoose.Types.ObjectId(_id) });
  return del;
};

UserSchema.statics.updatePassword = async (_id, val) => {
  let hashPass = await bcrypt.hash(val, 10);
  const upt = await User.updateOne(
    { _id: mongoose.Types.ObjectId(_id) },
    { $set: { password: hashPass } }
  );
  return upt;
};

UserSchema.statics.updateProfile = async (
  _id,
  email,
  password,
  name,
  alias,
  role
) => {
  const pass = await bcrypt.hash(password, 10);

  const upt = await User.updateOne(
    { _id: mongoose.Types.ObjectId(_id) },
    {
      $set: {
        email,
        name,
        alias,
        role,
        password: pass,
      },
    }
  );
  return upt;
};

module.exports = User = mongoose.model('users', UserSchema, 'users');
