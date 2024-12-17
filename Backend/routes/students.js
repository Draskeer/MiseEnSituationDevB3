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

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (error) {}
});
module.exports = router;
