// const { log } = require("console");
const express = require("express")
const app = express()
const port = 5000 // ctrl + c = untuk menghentikan port ketika ingin refresh(mengubah isi di res)
const path = require("path");
const config = require("./config/config.json")
const {Sequelize, QueryTypes} = require("sequelize");
const { log } = require("console");
const sequelize = new Sequelize(config.development)
// const { title } = require("process");


// app.set = setting variable global, configuration, etc
app.set ("view engine", "hbs");
// ini untuk mengasih tau bahwa file hbs nya ada difile views
app.set("views", path.join(__dirname, "./views"))

// app.use = setting middleware
app.use("/assets", express.static(path.join(__dirname, "./assets")))

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

// ------ ADD PROJECT

function addProject (req, res) {
  res.render("addProject" ,{data})  
}

async function addTheProject (req, res) {
    const { title, content } = req.body;

    const query = `INSERT INTO blogs(title,content,image,"createdAt","updatedAt") VALUES('${title}', '${content}','https://images.pexels.com/photos/1337373/pexels-photo-1337373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', now(), now())`
    const data = await sequelize.query(query, {type : QueryTypes.INSERT})

    console.log("data yg di tambah", data);

    // console.log(title, content);
    res.redirect("myProject");
    
}


// -------- DETAIL PROJECT ------------

function addDetailProject (req, res) {
    const { title, content, endDate, startDate, id } = req.body;
    data [id] = {
        title, content, endDate, startDate, image
    }
    res.redirect("myProject")
}

async function detailProjectView (req, res) {

    const { id } = req.params;
    // const query = "SELECT * FROM blogs WHERE id=" + id
    const query = `SELECT * FROM blogs WHERE id=${id}` // Cara kedua
    const data = await sequelize.query(query, {type: QueryTypes.SELECT});
    console.log("data", data[0]);
    res.render("detailProject" ,{data:data[0]}) 
}


// ----- DELETE ----------

async function deleteProject (req, res) {
    const { id } = req.params;
    const query = `DELETE FROM blogs WHERE id=${id}`
    const data = await sequelize.query(query, {type : QueryTypes.DELETE})
    console.log("data yg di delete", data);

    res.redirect("/myProject")
}

// ----------- EDIT PROJECT -----------

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



function contactMe (req, res) {
    res.render("contactMe")  
}

async function myProject (req, res) {
    // res.render("myProject", {data : data});  

    const query = "SELECT * FROM blogs"
    const data = await sequelize.query(query, {type: QueryTypes.SELECT});

    res.render("myProject" ,{data}) 

}

function myListProject (req, res) {
    
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