
const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    title : {
        type : String,
        required : true
    }, 
    desc : {
        type : String,
        required : true
    },
    tag : {
        type : String,
        default : "No Tag"
    },
    date : {
        type : Date,
        default : Date.now  
    }
  });

  module.exports = mongoose.model('Notes',notesSchema);