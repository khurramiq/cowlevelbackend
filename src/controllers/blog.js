const Blog = require('../models/blog');

exports.createBlog = async (req, res) => {
  try {
    // const userId = req.token._id;
    const savedBlog = await Blog.create(req.body);
    res.status(200).json({ savedBlog });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    // const userId = req.token._id;
    const { blogId } = req.params;
    const blog = await Blog.getById(blogId);
    res.status(200).json({ blog });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getAllRecord = async (req, res) => {
  const { currentPage, pageSize } = req.params;
  console.log('currentPage', currentPage);
  console.log('pageSize', pageSize);
  try {
    const items = await Blog.getPaginationData(currentPage, pageSize);
    res.status(200).json({ items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
exports.getBlogTotalPages = async (req, res) => {
  const { pageSize } = req.params;
  try {
    const totalPages = await Blog.getTotalPages(pageSize);
    res.status(200).json({ totalPages });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.body._id;
    const updatedBlog = await Blog.updateById(blogId, req.body);
    res.status(200).json({ updatedBlog });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
exports.commentOnBlog = async (req, res) => {
  try {
    const blogId = req.body.blogId;
    const savedComment = await Blog.addComment(blogId, req.body);
    res.status(200).json({ savedComment });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    await Blog.deleteItem(blogId);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
