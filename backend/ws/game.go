package ws

import (
    "fmt"
    "log"
    "time"
)

func GameTimer() {
	gametimer := time.NewTimer(2 * time.Second)
	// gametimer channel notified after 5 Seconds
	// 5 * time.Second = 5 seconds
	// 5 * time.Minute = 5 minutes (changed afterwards)
	
	<-gametimer.C
	// timer's channel C blocked until a value sent indicating that the timer fired
	fmt.Println("Game Timer fired")
    // Have to figure out how to let timer function run in parallel
    // hub. update status to Client.go GameState Over bool
}

func handleCoords(c *Client, coords int, hub *Hub) {
    // @Peiyee: Add logic to handle the coordinates here.
    mapCoords(c *Client, coords int, hub *Hub)
}

// Declaring map boundary constants
// Might want to create a new function to apply different boundaries for different maps
var topLeftX int = 0
var topLeftY int = 1000

var topRightX int = 1000
var topRightY int = 1000

var bottomLeftX int = 0
var bottomLeftY int = 0

var bottomRightX int = 100
var bottomRightY int = 0
// Assuming client.go line 60:string(coords) will be in "X, Y" string form

func mapCoords(c *Client, x int, y int, hub *Hub) {
    if (coords < topLeftX || coords > topLeftY) {
        // hub. update status to c.
        fmt.Println("Out of Bounds")
    } else if (coords > topRightX || coords > topRightY) {
        // hub. update status to c.
        fmt.Println("Out of Bounds")
    } else if (coords < bottomLeftX || coords < bottomLefty) {
        // hub. update status to c.
        fmt.Println("Out of Bounds")
    } else if (coords > bottomRightX || coords < bottomRightY) {
        // hub. update status to c.
        fmt.Println("Out of Bounds")
    }
}

func playerCoords(c *Client, coords string, hub *Hub) {
    // How to call all c in Client string ?
    // If the c parameter does not equal to the case parameters, check it with their current coordinates
    // Might need a callback function 
    // Only map if the opposite clients seeker status does not equal to oneself
}

func teamStatus(){
    // function to check and update how many hiders left
    // if number of hiders == 0, game over
    // hub. update status to Client.go GameState Over bool
}
