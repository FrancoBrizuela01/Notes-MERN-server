const Note = require("../models/Note");
const { validationResult } = require("express-validator");

exports.createNote = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const note = new Note(req.body);
    note.save();
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a mistake");
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ created: -1 });
    res.json({ notes });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a mistake");
  }
};

exports.updateNote = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { title, description } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }

  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    note = await Note.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.deleteNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    await Note.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Deleted note" });

  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

