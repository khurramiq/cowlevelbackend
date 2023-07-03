const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    url: { type: String, required: true },
  },
  { timestamps: true }
);

imageSchema.statics.getById = async (_id) => {
  const item = await Image.findOne({ _id: mongoose.Types.ObjectId(_id) });
  return item;
};

imageSchema.statics.getLastRecord = async () => {
  const lastRecord = await Image.findOne({
    $query: {},
    $orderby: { $natural: -1 },
  });
  return lastRecord;
};

imageSchema.statics.getAll = async () => {
  const item = await Image.find({}).sort({ _id: 1 });
  return item;
};

imageSchema.statics.updateById = async (_id, body) => {
  const item = await Image.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return item;
};

imageSchema.statics.deleteItem = async (_id) => {
  const deletedHowTo = await Image.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return deletedHowTo;
};

module.exports = Image = mongoose.model('images', imageSchema, 'images');
