# Hoover API 
A server side application with a simple endpoint that returns a JSON object containing Hoover instructions for the client-side application to use.

### Prerequisites
The following should be installed on your computer, and are needed to run this:

* [NODE](https://nodejs.org/en/download/)
* [NPM](https://docs.npmjs.com/cli/install)
* [The client portion of this application](https://github.com/AmberLBurroughs/hoover/tree/master/view)

### Installing
1) Download the server repository to a local machine and open repository in an IDE of choice.

2) Install dependencies and start server:
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
A single endpoint is used to retrieve Hoover instruction data. This endpoint utilizes `fs` to read in the `input.txt` file. The file's contents are read in and formatted before being sent back as a JSON response.

Read file method:
```
fs.readFile('./input.txt', 'UTF8',  (err, data) => {
    if (err) {
        logError(err);
    }
    res.json(formatInputFileData(data))
})
```

`input.txt` file example:
```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```

JSON response of the example `input.txt` above:
```
let hooverObj = {
    dimensions: [5, 5]
    directions: ["N", "N", "E", "S", "E", "E", "S", "W", "N", "W", "W"]
    dirtPos: ["1 0", "2 2", "2 3"]
    startPos: [1, 2]
}
```

## Changing the Hoover's cleaning instructions

The server reads the `input.txt` file for a set of instructions on what to clean.

Inside the `test_inputs` folder, there are several test inputs files you can play with (by swapping their contents into the `input.txt` file):

- default.txt: The default instruction set provided in the example.
- test_A.txt: A single line grid (1x4) where the Hoover attempts to go out of bounds and eventually returns back to its origin.
- test_B.txt: A 2x4 grid testing that the Hoover picks up on dirt on the location it starts at.
- test_C.txt: A larger grid where the Hoover moves around and picks up dirt, meant to test the display size on the frontend.
- test_D.txt: A single line grid where the Hoover only attempts to move out of bounds.

## Built With
* [Express](http://expressjs.com/) - Node.js web application framework.
* [Moment](https://momentjs.com/) - Date Time Library. 
* [FS](https://nodejs.org/api/fs.html) - File System used for reading and updating files.
