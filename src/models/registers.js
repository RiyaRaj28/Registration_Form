const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({

    fullname : {
        type : String,
        required : true 
    },
    username :{
        type : String,
    },
    email : {
        type : String,
        unique : true 
    },
    phone : {
        type : Number,
        unique : true 
    },
    password : {
        type : String ,
        required : true
    },
    cpassword : {
        type : String ,
        required : true
    },
    gender : {
        type : String,
        required : true 
    }
})

const Register = new mongoose.model("Register", employeeSchema)

module.exports = Register 