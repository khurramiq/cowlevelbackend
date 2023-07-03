const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investFormSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    investOption: { type: String, required: true },
    investAmount: { type: Number, required: true },
    dauraUsername: { type: String, required: true },
  },
  { timestamps: true }
);

investFormSchema.statics.getById = async (_id) => {
  const item = await InvestForm.findOne({ _id: mongoose.Types.ObjectId(_id) });
  return item;
};

investFormSchema.statics.getLastRecord = async () => {
  const lastRecord = await InvestForm.findOne({
    $query: {},
    $orderby: { $natural: -1 },
  });
  return lastRecord;
};

investFormSchema.statics.getAll = async () => {
  const item = await InvestForm.find({}).sort({ _id: 1 });
  return item;
};

investFormSchema.statics.updateById = async (_id, body) => {
  const item = await InvestForm.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return item;
};

investFormSchema.statics.deleteItem = async (_id) => {
  const item = await InvestForm.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return item;
};

module.exports = InvestForm = mongoose.model(
  'investForms',
  investFormSchema,
  'investForms'
);
