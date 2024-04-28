const express = require('express')
const app = express()
const port = 5000 // ctrl + c = untuk menghentikan port ketika ingin refresh(mengubah isi di res)
 
// app.set = setting variable global, configuration, etc
app.set('view engine', 'hbs');
// route = rute
// untuk mengembalikan data(res) biasa menggunakan send atau json 
// properties app = get, post, put, delete, patch
app.get("/", home)

// services
function home (req, res) {
    res.send("aaa")
}

app.listen(port, () => {
    console.log("Server is running on PORT :", port);
})
