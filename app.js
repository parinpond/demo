const express = require("express");
const app     = express();
const authRoute = require("./routes/auth");
const homeController = require("./controller/home-controller");
const pageNotFoundController = require("./controller/page-not-found-controller");
const mongoose =require("mongoose");
const bodyParser =require("body-parser");
const port = process.env.port || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine","ejs");
app.set("views","views");
app.use(authRoute);
app.get("/",homeController);
app.get("*",pageNotFoundController);


mongoose
.connect(
    "mongodb+srv://:@cluster0.p0qdz.mongodb.net/?retryWrites=true&w=majority",
    {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true,}
    )
    .then(()=>{
    console.log("Database Connected!");
})
.catch(()=>{
    console.log("Cannot Database to Connected!");
});
app.listen(port,function(){
    console.log("Listening on port",port);
});