const express = require("express");
const hbs = require("hbs"); 
const app = express(); 
const path = require("path");
require("./db/conn"); 
const Register = require("./models/registers")


const port = process.env.PORT || 3000; 

const static_path = path.resolve(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views"); 
const partials_path = path.join(__dirname, "../templates/partials"); 

app.use(express.json());
app.use(express.urlencoded({extended:false})); 

app.set("view engine", "hbs");
app.set("views", template_path);

hbs.registerPartials(partials_path); 
app.use(express.static(static_path));

app.get("/", (req,res)=> {
    res.render("index");
});

app.post("/index", async(req,res) => {
    try {

        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if(password === cpassword){
            const registerEmployee = new Register({
                fullname : req.body.fullname,
                username : req.body.username,
                email : req.body.email,
                phone : req.body.phone,
                gender : req.body.gender,
                password : req.body.password,
                cpassword : req.body.cpassword
            })
            const registered = await registerEmployee.save();
            res.status(201).render("index"); 
            
        }else{
            res.send("Passwords are not matching!");
        }
        
    } catch (error) {
        res.status(400).send(error); 
    }
}
)

// app.get("/register", (req,res)=> {
//     res.render("register"); 
// })

app.listen(port, ()=> {
    console.log(`Server is running at port num ${port}`);
})
