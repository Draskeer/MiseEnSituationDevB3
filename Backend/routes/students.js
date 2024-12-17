const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
router.get("/", async (req, res) => {
  try {
    const students = Student.find({});
    res.json(students);
  } catch (error) {
    console.error(error);
  }
});
router.get();
module.exports = router;
