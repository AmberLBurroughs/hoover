# Hoover the imaginary robot vacuum
A robotic vacuum emulator that is controlled by a set of instructions. Hoover naviates on a grid to collect dirt pieces. The dirt pieces are set to specific X and Y coordinates on the grid when the application starts. Using directions provided hoover moves to a new location and the location coordinates are evaluated against the dirt position. After hoover completes running the final position and total dirt pieces are displayed on the page.

<div align="center">
    <img src="view/hoover.gif" alt="screenshot of application" width="40%">
</div>

Decoupled application that uses a React view and Node server. 

[Demo](https://hoover-demo.herokuapp.com/)

# Programming challenge:
This program is split out into two services: a React client-facing application that shows the Hoover navigate through the grid, and a Node.js server that reads in the `input.txt` file and sends it to the frontend.

## Design
I decided to create a client facing web application for this challenge because its a fun and interesting challenge but also makes testing the application a lot easier. I used React for rendering the view because this application has a lot of dynamically created/updated properties and react handles this with ease.

I created a server using Node and Express to handle reading the input file because it open the door to more functionality like, uploading / updating instruction files, and storing past cleaning results.

## Challenges
While building this application I came across some interesting problems like creating the grind in a kind of cartesian/math style where were the grid start at the bottom left. I found this challenging since a normal 2d array would start at the top left. I solved this by rotating the grid by 270 degrees with CSS. Though this brought on its own challenges like setting the height and width of the floor. Calculating the "floor" height and width needed to be done dynamically because the grid dimensions change, the rotation of the grid made this task tricky.

## Configuration
The application is seperated into two repositories with their own setup instructions.
* [server](https://github.com/AmberLBurroughs/hoover/tree/master/server)
* [view](https://github.com/AmberLBurroughs/hoover/tree/master/view)

## Improvements
Somethings I would like to improve about this application:
* Use an API endpoint to update/change/create the instruction settings in either object form or as a file upload.
* Send random hoover instructions each time instead of only reading from a single instruction each time.
* Send cleanup cleanup result to server to be added to a file and read from.
* Better animate the hoover to show it fully moving from position to position (as opposed to it jumping to the center of each square).
* Properly rotating the hoover based on the direction it is attempting to move, showing when it is hitting a wall and is not moving further in a certain direction.
* Coloring tiles which have dirt cleaned up.
* Display more positioning and grid information on the page.
* Allow user to clean again without having a page refresh.
* Make application more responsive.
