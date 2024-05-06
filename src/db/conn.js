const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/NewForm")
.then(()=> {
    console.log("Connection successful");
}).catch((e)=> {
    console.log(`no connection`); 
});