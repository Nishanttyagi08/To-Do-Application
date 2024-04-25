const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
  description:{
    type:String,
  },
  done:{
    type: Boolean
  }
});

module.exports = mongoose.model("ToDo", toDoSchema);
