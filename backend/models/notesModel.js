const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Notes', noteSchema)