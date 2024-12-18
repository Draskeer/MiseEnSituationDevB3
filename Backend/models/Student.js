const { model, Schema } = require("mongoose");

const StudentSchema = new Schema({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  classLevel: { required: true, type: String },
  validatingClass: { type: Boolean, default: false },
  teacher: String,
});

module.exports = model("Student", StudentSchema);
