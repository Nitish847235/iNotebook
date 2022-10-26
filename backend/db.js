const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/iNotebook").then(()=>{
    console.log("connection sucessfully!");
}).catch((e)=>{
    console.log(e);
})
