const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
      //Connecting the database to the server
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database is connnected");
    } catch (err) {
        console.log(err)
    };
};
module.exports = connectDB;