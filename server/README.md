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

## Assumptions
The following assumptions were made:
- The `input.txt` file is correctly formatted, where the first line contains the grid dimensions, the second line contains the starting coordinates of the Hoover, all subsequent lines are coordinates of dirt, and the last line denotes the directionst hat the Hoover takes.
- The coordinates for the Hoover and the pieces of dirt are all within bounds.
- If the Hoover receives a directional command that is not in `['N', 'E', 'S', 'W']`, the Hoover will stop in its tracks at the current location and error out.
- If a direction attempts to push the Hoover outside of the grid boundaries, the Hoover will hit a wall and will stay in the same place.
- The Hoover only needs to track the number of pieces of dirt that it has picked up, and does not need to track the locations of the dirt it has picked up.

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

## Built With
* [Express](http://expressjs.com/) - Node.js web application framework.
* [Moment](https://momentjs.com/) - Date Time Library. 
* [FS](https://nodejs.org/api/fs.html) - File System used for reading and updating files.
