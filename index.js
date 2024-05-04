// const { log } = require("console");
const express = require("express")
const app = express()
const port = 5000 // ctrl + c = untuk menghentikan port ketika ingin refresh(mengubah isi di res)
const path = require("path");
const config = require("./config/config.json")
const {Sequelize, QueryTypes, where} = require("sequelize");
const { log } = require("console");
const { title } = require("process");
const sequelize = new Sequelize(config.development)
const bcrypt = require("bcrypt")
const User = require("./models").user // INI CARA MEMAKAI ORM SELAIN PAKAI QUERY
const session = require("express-session") // INI INSTALL NPM EXPRESS SESSION
const flash = require("express-flash") // INSTALL 


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

// INI CARA MENGGUNAKAN EXPRESS SESSION YG KITA GUNAKAN
app.use(session({
    name : "mySession",
    secret : "rahasiague",
    resave: false,
    saveUninitialized: true,
    cookie : {
        secure : false, //KENAPA false? KARENA KITA BELUM DEPLOY, MASIH DI LOCALHOST, KALAU DI HTTPS BARU PAKAI TRUE
        maxAge : 1000 * 60 * 60 * 24 //CUMA BISA LOGIN 1 HARI, SETELAH ITU LOGIN ULANG
    },
}))

app.use(flash());

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


app.get("/login", loginView)
app.get("/register", registerView)

app.post("/login", login)
app.post("/register", register)

app.post("/logout", logout)


const data = [];

// services

// ------- LOGOUT ----------
async function logout (req, res) {

    // MEMBUAT LOGOUT DENGAN DESTROY EXPRESS-SESSION
    req.session.destroy(function(err) {
        if(err) return console.error("Logout failed!");

        console.log("Logout succes!");
        res.redirect("/login")
    })
}





// ----------------- LOGIN ------------

function loginView (req, res) { // UNTUK MUNCULKAN HALAMAN WEB
    res.render("login")

    
}

async function login (req, res) { // MENGAMBIL DATA DENGAN METHOD POST, DGN CARA DI PANGGIL
    const { email, password } = req.body
    console.log(email, password);


    // INI CARA MENGGUNAKAN ORM SELAIN MEMAKAI QUERY
    // BAGIAN const user = BISA KITA HAPUS KALAU GA BUTUH RETURN
    const user = await User.findOne({
        where: {email},
    });

    if(!user) {
    //    return console.error("Email is not found!");

       req.flash("error", "Email or password is wrong!")
       return res.redirect("login")
    };

    const isPasswordValid = await bcrypt.compare(password, user.password)
    // console.log("is password valdi?", isPasswordValid);

    if(!isPasswordValid) {
        return console.error("Password is wrong!")

    };

    req.session.isLogin = true
    req.session.user = {
        name : user.name,
        email : user.email
    }

    req.flash("succes", "Login berhasil!")
    // console.log("Login berhasil!");
    res.redirect("/home");
    
}

// -------- REGISTER --------

function registerView (req, res) {
    res.render("register")
}

async function register (req, res) {
    const {name, email, password} = req.body  // ini maksudnya adalah mengambil inputan data dari name="..." yg sudah diisi kan
    // console.log(name, email, password);

    // MENGUBAH PASSWORD MENJADI TULISAN RANDOM
    const salt = 10; // SEMAKIN TINGGI ANGKANYA AKAN SEMAKIN SUSAH
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log("ini adalah password yang sudah kita hash", hashedPassword);

    //MEMASUKKAN DATA KE TABLE USERS DI PG ADMIN
    const query = `INSERT INTO users(name,email,password,"createdAt","updatedAt") VALUES('${name}', '${email}', '${hashedPassword}', now(), now())`
    const data = await sequelize.query(query, {type : QueryTypes.INSERT})

    // console.log(data);

    res.redirect("/login")
}

// --------- HOME --------------

function home (req, res) {

    // isLogin dan user berfungsi untuk menghilangkan line apabila user login, liat bagian home.hbs untuk data yg dihilangkan
    const isLogin = req.session.isLogin
    const user = req.session.user

    console.log(isLogin, user);
    res.render("home",{isLogin, user});  
    
}

// ------ ADD PROJECT --------

function addProject (req, res) {
  res.render("addProject" ,{data})  
}

async function addTheProject (req, res) {
    const { title, content, image, startDate, endDate, author} = req.body;

    const query = `INSERT INTO blogs(title,content,image,"createdAt","updatedAt","startDate","endDate",author) VALUES('${title}', '${content}','https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',now(),now(),'${startDate}', '${endDate}', '${author}')`
    const data = await sequelize.query(query, {type : QueryTypes.INSERT})
    
    // console.log("data yg di tambah", data);

    
    res.redirect("myProject");
    
}


// -------- DETAIL PROJECT ------------

function addDetailProject (req, res) {

    const { title, content, endDate, startDate, author, id } = req.body;
    data [id] = {
        title, content, endDate, startDate, author, image
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

async function editProject (req, res) {

    const { title, content, startDate, endDate, author, id } = req.body;
    // data [id] = {
    //     title, content, endDate, startDate, author, id
    // }
    const query = `UPDATE blogs SET title='${title}', content='${content}', "startDate"='${startDate}', "endDate"='${endDate}', author='${author}' WHERE id=${id}`
    const data = await sequelize.query(query, {type : QueryTypes.UPDATE})

    // console.log(data);

    res.redirect("myProject")
}


async function editProjectView (req, res) {

    const { id } = req.params;

    const query = `SELECT * FROM blogs WHERE id=${id}` 
    const data = await sequelize.query(query, {type: QueryTypes.SELECT});
    
    // const selectedData = data[id];
    // selectedData.id = id

    res.render("editProject", {data : data[0]});
}



function contactMe (req, res) {
    res.render("contactMe")  
}

async function myProject (req, res) {
    
    // MENGAMBIL DATA DARI TABLE BLOGS YANG SUDAH DI ISI
    const query = "SELECT * FROM blogs"
    const data = await sequelize.query(query, {type: QueryTypes.SELECT});

    // const data = 

    res.render("myProject" ,{data}) 

}

function myListProject (req, res) {
    
    const {image ,title, content, startDate, endDate, author} = req.body
    data.push({
        image ,title, content, startDate, endDate, author
    });
    
    deleteProject()

}


app.listen(port, () => {
    console.log("Server is running on PORT :", port);
})


// kalau mau coba post foto bisa pakai multer-npm