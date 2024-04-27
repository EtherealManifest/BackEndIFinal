const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        await mongoose.connect(proces.env.DATABASE_URL,
    {
        useUnifiedTopoplogy: true,
        useNewUrlParser : true
    })
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB;