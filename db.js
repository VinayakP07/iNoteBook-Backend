const mongoose = require('mongoose');
const mongURL = "mongodb://localhost:27017/iNoteBook_Auth";

const connectToMongo = async() => {
    await mongoose.connect(mongURL);
    console.log("Connected to your MongoDB Database Successfully");
}

module.exports = connectToMongo;