const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogschema = new Schema({
    title:{
        type:String,
      
    },
    subtitle:{
        type:String
    },

    description:{
        type:String
    },

    image:{
        type:String
    }
})

const Blog= mongoose.model("Blog",blogschema)
module.exports = Blog
