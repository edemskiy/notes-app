const { Router } = require("express");
const Note = require("../models/Note");
const auth = require("../middlewares/auth.middleware");

const router = Router();

router.post("/create", auth, (req, res) => {
  const currentDate = Date.now();
  note = new Note({
    ...req.body,
    owner: req.userId,
    createdAt: currentDate,
    editedAt: currentDate
  });

  note
    .save()
    .then(() => {
      res.status(201).json({ note });
    })
    .catch(err => {
      res.status(500).json({ message: "Server error. Try again later" });
    });
});

router.get("/", auth, (req, res) => {
  Note.find({ owner: req.userId })
    .then(notes => res.status(201).json({ notes }))
    .catch(err =>
      res.status(500).json({ message: "Server error. Try again later" })
    );
});

router.delete("/delete/:id", auth, (req, res) => {
  Note.deleteOne({ owner: req.userId, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Note deleted" }))
    .catch(err =>
      res.status(500).json({ message: "Server error. Try again later" })
    );
});

module.exports = router;
