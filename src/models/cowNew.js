const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cowNewSchema = new Schema(
  {
    coverImageURL: { type: String, required: true },
    title: { type: String, required: true },
    shortText: { type: String, required: true },
    content: { type: String, required: true },
    publishDate: { type: Date, default: new Date(), required: true },
    publish: { type: Boolean, default: false },
    author: { type: String, required: true },
    comments: [
      {
        comment: { type: String },
        name: { type: String },
        email: { type: String },
        website: { type: String },
        approved: { type: Boolean, default: false },
        date: { type: Date, default: new Date() },
      },
    ],
  },
  { timestamps: true }
);

cowNewSchema.statics.getById = async (_id) => {
  const item = await CowNew.findOne({ _id: mongoose.Types.ObjectId(_id) });
  return item;
};

cowNewSchema.statics.addComment = async (_id, comment) => {
  const updated = await CowNew.findByIdAndUpdate(
    _id,
    {
      $push: {
        comments: comment,
      },
    },
    { new: true }
  );
  return updated;
};

cowNewSchema.statics.getLastRecord = async () => {
  const lastRecord = await CowNew.findOne({
    $query: {},
    $orderby: { $natural: -1 },
  });
  return lastRecord;
};

cowNewSchema.statics.getAll = async () => {
  const item = await CowNew.find({}).sort({ _id: 1 });
  return item;
};

cowNewSchema.statics.updateById = async (_id, body) => {
  const item = await CowNew.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return item;
};

cowNewSchema.statics.deleteItem = async (_id) => {
  const item = await CowNew.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return item;
};

module.exports = CowNew = mongoose.model('cowNews', cowNewSchema, 'cowNews');
