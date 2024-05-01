const { log } = require("console");
const express = require("express")
const app = express()
const port = 5000 // ctrl + c = untuk menghentikan port ketika ingin refresh(mengubah isi di res)
const path = require("path");
const { title } = require("process");


// app.set = setting variable global, configuration, etc
app.set ("view engine", "hbs");
// ini untuk mengasih tau bahwa file hbs nya ada difile views
app.set("views", path.join(__dirname, "../../views"))

// app.use = setting middleware
app.use("/assets", express.static(path.join(__dirname, "../../assets")))

// body parser
app.use(express.urlencoded({extended : false}))
// extended : false => querystring bawaan dari express
// extended : true => querystring third party => qs

// route = rute
// untuk mengembalikan data(res) biasa menggunakan send atau json 
// properties app = get, post, put, delete, patch
app.get("/home", home)
app.get("/addProject", addProject)
app.post("/addProject", addTheProject)
app.get("/contactMe", contactMe)
app.get("/myProject", myProject)
app.post("/myProject", myListProject)


const data = [];

// services
function home (req, res) {
    res.render("home")  
}

function addProject (req, res) {
    res.render("addProject" ,{data : data})  
}

function addTheProject (req, res) {
    const {image ,title, content, startDate, endDate} = req.body
    data.push({
        image ,title, content, startDate, endDate
    });
    res.redirect("myProject")
    console.log(data);
}

function contactMe (req, res) {
    res.render("contactMe")  
}

function myProject (req, res) {
    res.render("myProject", {data : data});  
}

function myListProject (req, res) {
    
    const {image ,title, content, startDate, endDate} = req.body
    data.push({
        image ,title, content, startDate, endDate
    });
    
    // addTheProject()
    
}


app.listen(port, () => {
    console.log("Server is running on PORT :", port);
})
