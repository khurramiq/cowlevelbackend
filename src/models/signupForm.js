const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signupFormSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

signupFormSchema.statics.getById = async (_id) => {
  const item = await SignupForm.findOne({ _id: mongoose.Types.ObjectId(_id) });
  return item;
};

signupFormSchema.statics.getLastRecord = async () => {
  const lastRecord = await SignupForm.findOne({
    $query: {},
    $orderby: { $natural: -1 },
  });
  return lastRecord;
};

signupFormSchema.statics.getAll = async () => {
  const item = await SignupForm.find({}).sort({ _id: 1 });
  return item;
};

signupFormSchema.statics.updateById = async (_id, body) => {
  const item = await SignupForm.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return item;
};

signupFormSchema.statics.deleteItem = async (_id) => {
  const item = await SignupForm.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return item;
};

module.exports = SignupForm = mongoose.model(
  'signupForms',
  signupFormSchema,
  'signupForms'
);
