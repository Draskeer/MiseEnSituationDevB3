const { model, Schema } = require("mongoose");
const StudentSchema = new Schema({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  classLevel: { required: true, type: String },
  validatingClass: { required: true, type: Boolean },
  teacher: String,
});

module.exports = model("Student", StudentSchema);
