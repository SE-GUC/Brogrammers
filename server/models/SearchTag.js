const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SearchTagSchema = new Schema({
  tag:{
    type: String,
    required: true
  },
  location:{
      type: Array,
      required :true
  }
})

module.exports = mongoose.model('searchTag', SearchTagSchema)
