const express = require("express");
const hbs = require("hbs"); 
const app = express(); 
const path = require("path");
require("./db/conn"); 
const Register = require("./models/registers")
const bcrypt = require("bcryptjs") 


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

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/login", (req, res) => {
    res.render("login"); 
})

app.post("/register", async(req,res) => {
    try {

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password.toString() === cpassword.toString()){
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword 
            })
            console.log("the success part "+ registerEmployee);


            const registered = await registerEmployee.save();
            console.log("The page part" + registered)
            res.status(201).render("index"); 
            
        }else{
            res.send("Passwords are not matching!");
        }
        
    } catch (error) {
        res.status(400).send(error); 
        console.log("the error part page :")
    }
}
)

app.post("/login", async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        console.log(`${email} and password is ${password}`)
        const useremail = await Register.findOne({email:email});  //email entered by the user and email id db are same?

        if(useremail.password === password){
            res.status(201).render("index");
        }else{
            res.send("invalid login details");
        }
    }
    catch(error){
        res.status(400).send("invalid login details")
    }
})


const securePassword = async(password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash); 

    const passwordmatch = await bcrypt.compare("riya", passwordHash);
    console.log(passwordmatch); 
}

securePassword("riya")

app.listen(port, ()=> {
    console.log(`Server is running at port num ${port}`);
})
