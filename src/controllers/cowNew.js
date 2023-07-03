const CowNew = require('../models/cowNew');

exports.createCowNew = async (req, res) => {
  try {
    // const userId = req.token._id;
    const savedCowNew = await CowNew.create(req.body);
    res.status(200).json({ savedCowNew });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getCowNewById = async (req, res) => {
  try {
    // const userId = req.token._id;
    const { cowNewId } = req.params;
    const cowNew = await CowNew.getById(cowNewId);
    res.status(200).json({ cowNew });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getAllRecord = async (req, res) => {
  try {
    const items = await CowNew.getAll();
    res.status(200).json({ items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.commentOnNews = async (req, res) => {
  try {
    const newsId = req.body.newsId;
    const savedComment = await CowNew.addComment(newsId, req.body);
    res.status(200).json({ savedComment });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.updateCowNew = async (req, res) => {
  try {
    const cowNewId = req.body._id;
    const updatedCowNew = await CowNew.updateById(cowNewId, req.body);
    res.status(200).json({ updatedCowNew });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteCowNew = async (req, res) => {
  try {
    const { cowNewId } = req.params;
    await CowNew.deleteItem(cowNewId);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
