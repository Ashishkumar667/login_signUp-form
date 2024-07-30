const express = require("express");
const path = require("path");
const databasecolln = require("./mongodb");
const bcrypt = require('bcrypt');

const app = express();
//json formatting
app.use(express.json());



app.use(express.urlencoded({ extended: false }));
//use EJS as the view engine ..we can use pug,hbs also
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'public')));
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    // Check if the username already exists in the database
    const registereduser = await databasecolln.findOne({ name: data.name },{password: data.password});

    if (registereduser) {
        res.send('already registered,try with different name & password');
    } else {
       
       
        const hashedPassword = await bcrypt.hash(data.password, 10);

        data.password = hashedPassword; //if hashedpassword is not there then password can be seen 
        const userdata = await databasecolln.insertMany(data);
        console.log(userdata);
        res.render('aftersignup')
        
    }
    

});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await databasecolln.findOne({ name: req.body.username });
        if (!check ) {
            res.send("User name cannot found"+" Go back to Sign Up ")
        }
        
        const psrdmatch = await bcrypt.compare(req.body.password, check.password);
        if (!psrdmatch) {
            res.send("wrong Password");
        }
        else {
            res.render("home");
        }
    }
    catch {
        res.send("wrong Details");
    }
});



const port = 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
