require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const connectDB = require("./config/dbConfig.js")
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

const whiteList = ["http://127.0.0.1:550", "http://localhost:3000", "https://www.google.com"];
const corsOptions = {
    origin: (origin, callback) =>{
        if(1){//whiteList.indexOf(origin) !== -1){
            callback(null, true);
        } else{
            callback(new Error(whiteList.indexOf(origin) + " is not allowed by Cors"));
        }
    },
    optionSuccessStatus: 200, 
}
 //connect to the database
 connectDB();

//Cross-origin-resource-sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

//routes

app.use("/states/", require("./routes/api/state_api.js"));
app.use("/", require("./routes/root.js"));






app.get('/*', (req, res) => {
    res.status(404);
    if(req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if( req.accepts("json")) {
        req.json({error: "404 Not Found"});
    } else{ 
        res.type("txt").send("404 not found");
    }
});

mongoose.connection.once("open", ()=> {
    app.listen(PORT, () =>{
        console.log(`App listening on port ${PORT}`);
    });
})

