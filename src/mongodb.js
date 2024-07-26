const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login-Form");//mongodb connection

// Checking database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const Login = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const databasecolln = new mongoose.model("users", Login);

module.exports = databasecolln;