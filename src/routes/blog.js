const express = require('express');
const {
  createBlog,
  getBlogById,
  updateBlog,
  getAllRecord,
  commentOnBlog,
  getBlogTotalPages,
  deleteBlog,
} = require('../controllers/blog');
const router = express.Router();

router.post('/create', createBlog);
router.post('/update', updateBlog);
router.post('/comment', commentOnBlog);
router.get('/currentPage/:currentPage/pageSize/:pageSize', getAllRecord);
router.get('/pageSize/:pageSize', getBlogTotalPages);
router.get('/:blogId', getBlogById);
router.delete('/:blogId', deleteBlog);

module.exports = router;
