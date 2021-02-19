const mongoose = require("mongoose")

const kassiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Kassid", kassiSchema)
/*   subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  } */
