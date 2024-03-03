package ws

import (
	"log"
	"time"
)

var timePassed int = 0

func gameTimer(gameDuration string){
    // To determine and start game timer.
    var timer int
    switch gameDuration{
    case "15":
        timer = 15
    case "30":
        timer = 30
    case "45":
        timer = 45
    default:
        log.Printf("error: Choice Invalid")

    }
    // Using case statements to assign value to timer (easier than using strconv).

    for (timePassed < timer) {
        // for-loop to keep track of time passed.
        gametimer := time.NewTimer(1 * time.Minute)
        <-gametimer.C
        timePassed += 1

        return &GameState{
            Timer: "timePassed",
            Message: "timePassed",
        }
        // Update timer status to frontend.
    }

    return &GameState{
        Over: true,
        Message: "Game Over!",
    }
    // Timer ended.
    // Update timer status to frontend.
}


var topLeftX float64
var topLeftY float64
var topRightX float64
var topRightY float64
var bottomLeftX float64
var bottomLeftY float64
var bottomRightX float64
var bottomRightY float64
// Variables to store the boundaries of the map.

func mapBoundary(choice string){
    // To determine the boundaries of the map.
    switch (choice){
    case "0":
        // Coordinates of the first map boundary.
        topLeftX = 90
        topLeftY = 9000
        
        topRightX = 9000
        topRightY = 9000
        
        bottomLeftX = 90
        bottomLeftY = 90
        
        bottomRightX = 900
        bottomRightY = 90
    
    case "1":
        // Coordinates of the second map boundary.
        topLeftX = 0
        topLeftY = 1000
        
        topRightX = 1000
        topRightY = 1000
        
        bottomLeftX = 0
        bottomLeftY = 0
        
        bottomRightX = 100
        bottomRightY = 0

    default:
        // Check validity of the map choice.
        log.Printf("error: Choice Invalid")
    }

}


func handleCoords(c *Client, x float64, y float64, hub *Hub){
    // Main Function to handle the coordinate updates from the frontend.
    mapCoords(c, x, y, hub)
    playerCoords(c, x, y, hub)
}


func mapCoords(c *Client, x float64, y float64, hub *Hub){
    // To check player-map boundary overlaps.
    var boundaryWarning string = "Warning! Please Stay in Map Boundary!"
    if (x < topLeftX || y > topLeftY) {    
        c.Socket.WriteJSON(boundaryWarning)
    } else if (x > topRightX || y > topRightY) {
        c.Socket.WriteJSON(boundaryWarning)
    } else if (x < bottomLeftX || y < bottomLeftY) {
        c.Socket.WriteJSON(boundaryWarning)
    } else if (x > bottomRightX || y < bottomRightY) {
        c.Socket.WriteJSON(boundaryWarning)
    }
}


func playerCoords(c *Client, x float64, y float64, hub *Hub){
    // To check seeker-hider boundary overlaps.

    var boundary float64 = 0.0001
    // Determine boundary(radius) of each player.

    gs := <- GameState
    oc := <- Client

    for _, oc := range hub.Rooms[c.RoomId].Clients {
    // 'c' for 'current client'; 'oc' for 'other client'.
    // for-loop to iterate through each of the clients' coordinates.

        var ocX float64 = oc.Coords.X
        var ocY float64 = oc.Coords.Y
        // Temporarily assign the coordinates of other clients

        if (c.Seeker == true){
            // Simplify function such that only check player-boundary overlap for seekers.

            if (c.Seeker != oc.Seeker){
                // If current client is the seeker and another is the hider, enter IF statement to check for player boundary overlap.

                if(x+boundary)>=(ocX+boundary) || (ocX-boundary)>=(x-boundary) || (y+boundary)>=(ocY+boundary) || (ocY-boundary)>=(y-boundary) {
                    // If seeker-hider boundary overlaps, enter IF Statement.
                    time.Sleep(5*time.Second)
                    // Sleep for 5 seconds to allow other clients to update their coordinates.
                    // If after 5 seconds, the seeker-hider boundary overlap persists, enter the next IF statement to take action.

                    if(x+boundary)>=(ocX+boundary) || (ocX-boundary)>=(x-boundary) || (y+boundary)>=(ocY+boundary) || (ocY-boundary)>=(y-boundary) {
                        playerScore(oc)
                        // Update hider's score
                        oc.Score = oc.Score - 200
                        // Decrement hider's score as a penalty for being caught
                        gs.HiderCount = gs.HiderCount - 1
                        // Update Hider Count value
                        oc.Seeker = true
                        // Change hider's status to seeker
                        playerScore(c)
                        // Update seeker's score
                    }
                }
            }
        }
    }
}


func playerScore(c *Client){
     var scoreint int64 = c.Score
     var playerRole bool = c.Seeker

     if (playerRole == false) {
     // score count for hiders
         scoreint = timePassed * 400
         // 400 for every minute hidden
     } else { 
     // score count for seeker
         scoreint += 1000
         // 1000 for every seeker caught
     }
}

// game state update function()

// at the end of the game if player still hider, have to then calculate their score
// we only display score at the end of the game!!