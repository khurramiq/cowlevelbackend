const Image = require('../models/image');

exports.createImage = async (req, res) => {
  try {
    // const userId = req.token._id;
    const savedImage = await Image.create(req.body);
    res.status(200).json({ savedImage });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getAllRecord = async (req, res) => {
  try {
    const items = await Image.getAll();
    res.status(200).json({ items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const howToId = req.body._id;
    const updatedHowTo = await HowTo.updateById(howToId, req.body);
    res.status(200).json({ updatedHowTo });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    await Image.deleteItem(imageId);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
