const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  std_name: {
    type: String,
    required: true,
  },
  std_roll: {
    type: String,
    required: true,
  },
  std_regno: {
    type: String,
  },
  std_email: {
    type: String,
  },
  std_phno: {
    type: Number,
    required: true,
  },
  std_address: {
    type: String,
  },
  std_pin: {
    type: Number,
    required: true,
  },
  std_course: {
    type: String,
    required: true,
  },
  std_stream: {
    type: String,
    required: true,
  },
  std_college: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("studentDetail", studentSchema);
