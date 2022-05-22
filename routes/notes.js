const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const { check } = require("express-validator");

// api/notes
router.post(
  "/",
  [check("title", "the title is required").not().isEmpty()],
  [check("description", "description is required").not().isEmpty()],
  noteController.createNote
);

router.get("/", noteController.getNotes);

router.put(
  "/:id",
  [check("title", "the title is required").not().isEmpty()],
  [check("description", "description is required").not().isEmpty()],
  noteController.updateNote
);

router.delete("/:id", noteController.deleteNote);



module.exports = router;
