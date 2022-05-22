const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { check } = require("express-validator");

// api/categories
router.post(
  "/",
  [check("name", "the name is required").not().isEmpty()],
  categoryController.createCategory
);

router.get("/", categoryController.getCategories);

module.exports = router;
