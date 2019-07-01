# Programming challenge:

## Design
I decided to create a client facing web application for this challenge because I thought it would be a fun and interesting challenge but also make demoing a lot easier. I used React for rendering the view because this application has a lot of dynamically created/updated properties and react handles this with ease.

I created a server using Node and Express to handle reading the input file because it open the door to more functionality like, uploading / updating instruction files, and storing past cleaning results.

## Challenges
While building this application I came across some interesting problems like creating the grind in a kind of cartesian/math style where were the grid start at the bottom left. I found this challenging since a normal 2d array would start at the top left. I solved this by rotating the grid by 270 degrees with CSS. Though this brought on its own challenges like setting the height and width of the floor. Calculating the "floor" height and width needed to be done dynamically because the grid dimensions change, the rotation of the grid made this task tricky.

## Configuration
The application is seperated into two repositories:
* server
* view

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
