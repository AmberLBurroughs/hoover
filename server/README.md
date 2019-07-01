# Hoover instruction API 
A server side application with a simple endpoint that returns an object of containing hoover instructions to the client to use.
This application uses Node with an Express server and React frontend. 


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
What things you need installed before running this application.

* [NODE](https://nodejs.org/en/download/)
* [NPM](https://docs.npmjs.com/cli/install)
* [The client portion of this application](https://github.com/AmberLBurroughs/hoover/tree/master/view)

### Installing

A step by step series of examples that tell you how to get a development env running

1) Download the server repository to a local machine and open repository in an IDE of choice.

2) Install dependencies & start server
```
# Open a new shell and navigate to the server directory
$ npm i
# this will install all dependencies for the node portion of this application
# once the installs have completed
$ node index.js
# the Node application is set to run on PORT 8000 
# * if you update the PORT make sure to update the proxy in the client package.json as well
```
## Functionality
A single endpoint is available to get hoover instruction data from. This endpoint utilizes fs to read a file. The file's content is returned, then formatted before being sent back as a repsone.

read file method:
```
fs.readFile('./input.txt', 'UTF8',  (err, data) => {
    if (err) {
        logError(err);
    }
    res.json(formatInputFileData(data))
})
```
file content example:
```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```
formatted response:
```
let hooverObj = {
    dimensions: dimensions,
    startPos: startPos,
    dirtPos: dirt,
    directions: direction
}
```

## Built With

* [Express](http://expressjs.com/) - Node.js web application framework.
* [Moment](https://momentjs.com/) - Date Time Library. 
* [FS](https://nodejs.org/api/fs.html) - File System used for reading and updating files.
