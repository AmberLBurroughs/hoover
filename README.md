# Hoover, the imaginary robot vacuum
A robotic vacuum emulator that is controlled by a set of instructions. The mighty Hoover naviates on a grid to collect pieces of dirt. The dirt pieces are set to specific X, Y coordinates on the grid. 

Using directions provided to the Hoover, it attempts to move to a new location with each instruction. The location coordinates are evaluated against the array of dirt locations. After the Hoover completes its journey, the final position and total dirt pieces are displayed on the page.

<div align="center">
    <img src="view/hoover.gif" alt="screenshot of application" width="40%">
</div>

Decoupled application that uses a React view and Node server. 

[View a demo of this application on Heroku!](https://hoover-demo.herokuapp.com/)

# Programming challenge:
This program is split out into two services: a React client-facing application that shows the Hoover navigate through the grid, and a Node.js server that reads in the `input.txt` file and sends it to the frontend.

## Design
I decided to create a client facing web application for this challenge because it's a fun and interesting problem, and also mmakes testing the application a lot easier when visualized. I used React for rendering the view because this application has a lot of dynamically created/updated properties.

I created a server using Node and Express to handle reading the input file because it opens the door to more functionality like uploading and updating instruction files.

## Assumptions
The following assumptions were made:
- The `input.txt` file is correctly formatted, where the first line contains the grid dimensions, the second line contains the starting coordinates of the Hoover, all subsequent lines are coordinates of dirt, and the last line denotes the directionst hat the Hoover takes.
- The coordinates for the Hoover and the pieces of dirt are all within bounds.
- If the Hoover receives a directional command that is not in `['N', 'E', 'S', 'W']`, the Hoover will stop in its tracks at the current location and error out.
- If a direction attempts to push the Hoover outside of the grid boundaries, the Hoover will hit a wall and will stay in the same place.
- The Hoover only needs to track the number of pieces of dirt that it has picked up, and does not need to track the locations of the dirt it has picked up.
- If the Hoover is starting on a location that also has a piece of dirt, the Hoover will pick up that piece of dirt.

## Challenges
While building this application I came across some interesting problems like creating a math-like grid where the origin (0,0) starts at the bottom left. I found this challenging since a conventional 2D array would usually start at the top left. Using CSS, I was able to rotate the grid 270 degrees, though this brought on its own challenges when referencing the X and Y coordinates, and setting the height/width of the grid so the tiles would be properly aligned. Calculating the "floor" height and width needed to be done dynamically because the grid dimensions change.

## Configuration
The application is separated into two repositories with their own setup instructions.
* [server](https://github.com/AmberLBurroughs/hoover/tree/master/server)
* [view](https://github.com/AmberLBurroughs/hoover/tree/master/view)

## Improvements
Some things I would like to improve about this application, provided more time:
* Use an API endpoint to update/change/create the instruction settings in either object form or as a file upload.
* Make it easier for multiple instruction sets to be read in, as opposed to modifying a single `input.txt` and restarting the application. 
* Send cleanup cleanup result to server to be added to a file and read from.
* Better animate the Hoover to show it fully moving from position to position (as opposed to it jumping to the center of each square after a timeout interval).
* Properly rotating the Hoover based on the direction it is attempting to move, and showing when it is hitting a wall.
* Coloring tiles that the Hoover moved over, and picked up dirt from.
* Display more positioning and grid information on the page.
* Allow the user to clean again without having a page refresh.
* Make application more responsive for different browser widths.
