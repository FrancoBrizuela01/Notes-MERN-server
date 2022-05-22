const Category = require("../models/Category");
const { validationResult } = require("express-validator");

exports.createCategory = async (req, res) => {
  //   const repeatedCategory = await Category.findOne({ name: req.body.name });
  //   if (repeatedCategory != null) {
  //     res.status(400).send("There was a mistake");
  //   }
  const errores = validationResult(req);
  console.log(req);
  console.log(errores);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    const category = new Category(req.body);
    category.save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a mistake");
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a mistake");
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    await Category.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Deleted note" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
