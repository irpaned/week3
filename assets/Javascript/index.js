// const { log } = require("console");
const express = require("express")
const app = express()
const port = 5000 // ctrl + c = untuk menghentikan port ketika ingin refresh(mengubah isi di res)
const path = require("path");
const config = require("../../config/config.json")
const {Sequelize, QueryTypes} = require("sequelize");
const { log } = require("console");
const sequalize = new Sequelize(config.development)
// const { title } = require("process");


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

app.post("/delete-project/:id", deleteProject)

app.post("/edit-Project", editProject)
app.get("/editProject/:id", editProjectView)

app.get("/contactMe", contactMe)

app.get("/myProject", myProject)
app.post("/myProject", myListProject)

app.post("/detail-Project", addDetailProject)
app.get("/detailProject/:id", detailProjectView)



const data = [];

// services
function home (req, res) {
    res.render("home")  
}

async function addProject (req, res) {
    // const query = "SELECT * FROM blogs"
    // const data = await sequalize.query(query, {type: QueryTypes.SELECT});


    res.render("addProject" ,{data})  
}

function addDetailProject (req, res) {

    const { title, content, endDate, startDate, id } = req.body;

    data [id] = {
        title, content, endDate, startDate, image
    }

    res.redirect("myProject")

    
}


function addTheProject (req, res) {
    const {image ,title, content, startDate, endDate} = req.body
    data.unshift({
        image ,title, content, startDate, endDate
    });
    res.redirect("myProject")
    
}



function deleteProject (req, res) {
    const { id } = req.params;
    data.splice (id, 1);
    console.log("data yg di delete", id);

   


    res.redirect("/myProject")
}

function editProject (req, res) {
    const { title, content, endDate, startDate, id } = req.body;

    data [id] = {
        title, content, endDate, startDate
    }

    res.redirect("myProject")
}

function editProjectView (req, res) {

    const { id } = req.params;
    const selectedData = data[id];
    selectedData.id = id

    res.render("editProject", {data : selectedData});
}



function detailProjectView (req, res) {

    const { id } = req.params;
    const selectedDetailData = data[id];
    selectedDetailData.id = id

    console.log(selectedDetailData);

    res.render("detailProject", {data : selectedDetailData});
    
}

function contactMe (req, res) {
    res.render("contactMe")  
}

async function myProject (req, res) {
    // res.render("myProject", {data : data});  
    const query = "SELECT * FROM blogs"
    const data = await sequalize.query(query, {type: QueryTypes.SELECT});

    
    res.render("myProject" ,{data}) 

    

}

async function myListProject (req, res) {
    
    const {image ,title, content, startDate, endDate} = req.body
    data.push({
        image ,title, content, startDate, endDate
    });
    

    deleteProject()
    
    
}


app.listen(port, () => {
    console.log("Server is running on PORT :", port);
})


// kalau mau coba post foto bisa pakai multer-npm