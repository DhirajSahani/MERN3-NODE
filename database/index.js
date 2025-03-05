const mongoose = require('mongoose')

async function connectToDatabase(){
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Data project connect Sucessfully..")
}


module.exports = connectToDatabase