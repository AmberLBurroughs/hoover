// Set up ======================================================
//Dependencies
const express = require("express");
const fs      = require('fs');
const moment  = require('moment');

const app  = express();
const PORT = process.env.PORT || 8000;

// Configuration ==============================================
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

// Enable CORS so that browsers don't block requests.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes ==============================================
// Read from input file, send values to client
app.get("/api/hoover", (req, res)=>{
    fs.readFile('./input.txt', 'UTF8',  (err, data) => {
        if (err) {
            logError(err);
        }
        res.json(formatInputFileData(data))
    })
});

// Helpers ==============================================
// format and log errors to errLog file 
logError = (err) => {
    let errorlog = [moment().format('mm/dd/yyyy hh:mm A'), err];
    errorlog = errorlog + ";\n";

    fs.appendFile('error.txt', errorlog, function (error) {
        if (error) throw error;
    });

    return console.log('Error occurred: please try again', err);
}

// Parse data from input.txt, format to be sent to client
formatInputFileData = (data) => {
    let fileData = data.split('\n');
    let dimensions = fileData[0].split(" ");
    // invert these dimensions, since we will be rotating the grid
    // by 90 degrees on display
    dimensions = [parseInt(dimensions[1]), parseInt(dimensions[0])];
    
    let startPos = fileData[1].split(" ");
    startPos = [parseInt(startPos[0]), parseInt(startPos[1])];

    let dirt = fileData.slice(2, fileData.length-1);
    
    let direction = fileData.pop();
    direction = direction.split("");

    let hooverObj = {
        dimensions: dimensions,
        startPos: startPos,
        dirtPos: dirt,
        directions: direction
    }

    return hooverObj
}

// Launch Server ==============================================
app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});