const InvestForm = require('../models/investForm');

exports.createInvestForm = async (req, res) => {
  try {
    // const userId = req.token._id;
    const savedInvestForm = await InvestForm.create(req.body);
    res.status(200).json({ savedInvestForm });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getInvestFormById = async (req, res) => {
  try {
    // const userId = req.token._id;
    const { investFormId } = req.params;
    const investForm = await InvestForm.getById(investFormId);
    res.status(200).json({ investForm });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getAllRecord = async (req, res) => {
  try {
    const items = await InvestForm.getAll();
    res.status(200).json({ items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.updateInvestForm = async (req, res) => {
  try {
    const _id = req.body._id;
    const updatedInvestForm = await InvestForm.updateById(_id, req.body);
    res.status(200).json({ updatedInvestForm });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteInvestForm = async (req, res) => {
  try {
    const { investFormId } = req.params;
    await InvestForm.deleteItem(investFormId);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
