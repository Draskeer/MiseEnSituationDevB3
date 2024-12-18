const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
router.get("/", async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newStudents = req.body;
    res.json(await Student.insertMany(newStudents));
  } catch (error) {
    console.error(error);
  }
});

router.put("/validating/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    student.validatingClass = !student.validatingClass;
    await student.save();
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (error) { }
});
module.exports = router;
