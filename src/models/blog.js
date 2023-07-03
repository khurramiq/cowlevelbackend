const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    coverImageURL: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    publish: { type: Boolean, default: false },
    publishDate: { type: Date, default: new Date(), required: true },
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

blogSchema.statics.getById = async (_id) => {
  const item = await Blog.findOne({ _id: mongoose.Types.ObjectId(_id) });
  return item;
};

blogSchema.statics.getLastRecord = async () => {
  const lastRecord = await Blog.findOne({
    $query: {},
    $orderby: { $natural: -1 },
  });
  return lastRecord;
};

blogSchema.statics.getAll = async () => {
  const item = await Blog.find({}).sort({ _id: 1 });
  return item;
};

blogSchema.statics.getPaginationData = async (currentPage, pageSize) => {
  currentPage = parseInt(currentPage);
  pageSize = parseInt(pageSize);
  try {
    const documents = await Blog.find({})
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .exec();
    return documents;
  } catch (err) {
    console.error('Error retrieving documents:', err);
    throw err; // You can choose to throw the error or handle it in another way
  }
};

blogSchema.statics.getTotalPages = async (pageSize) => {
  try {
    const totalCount = await Blog.countDocuments({});
    const totalPages = Math.ceil(totalCount / pageSize);
    return totalPages;
  } catch (err) {
    console.error('Error calculating total pages:', err);
    throw err;
  }
};

blogSchema.statics.addComment = async (_id, comment) => {
  const updated = await Blog.findByIdAndUpdate(
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

blogSchema.statics.updateById = async (_id, body) => {
  const item = await Blog.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return item;
};

blogSchema.statics.deleteItem = async (_id) => {
  const item = await Blog.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return item;
};

module.exports = Blog = mongoose.model('blogs', blogSchema, 'blogs');
