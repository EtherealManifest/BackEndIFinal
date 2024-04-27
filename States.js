const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
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

//Cross-origin-resource-sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use(require(path.join(__dirname, "routes", "root.js")));






app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "View", "404.html"));
});

app.listen(PORT, () =>{
    console.log(`Example app listening on port ${PORT}`);
});