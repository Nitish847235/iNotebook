const mongoose = require("mongoose");
// const validator = require("validator");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true, "Email id already present"],
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Invalid Email id");
        //     }
        // }
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Enter at least 6 character to strong password"]
    },
    phone:{
        type:Number,
        min:10
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const User = mongoose.model("user", userSchema);

module.exports = User;