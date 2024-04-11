package ws

import (
	"log"
	"math/rand"
	"strconv"
	"time"
    "fmt"
)

var timePassed int = 0

// Starts game timer.
func gameTimer(h *Hub, gameDuration string, roomId string) {

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

    for timePassed < timer {
        time.Sleep(time.Second * 5)
        timePassed++
        // Increment timePassed by 1 every minute.
        gs := updateTimer(h, timer-timePassed, roomId)
        h.Broadcast <- gs
    }

    gs := &GameState{
        Over: true,
        Started: true,
        RoomId: roomId,
        Message: "Time's Up! Game Over!",
        Timer: "0",
    }
    
    h.Broadcast <- gs 
}

func updateTimer(h *Hub, timeRemaining int, roomId string) (gs *GameState) {
    timeRemainingStr := strconv.Itoa(timeRemaining)

    // Get the current hider count.
    hiderCount := getPlayerCount(h.Rooms[roomId])

    gs = &GameState{
        Over: false,
        Started: true,
        RoomId: roomId,
        Message: "Time Remaining: " + timeRemainingStr + " minutes",
        Timer: timeRemainingStr,
        HiderCount: hiderCount,
    }

    return gs
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


func updateState(c *Client, hub *Hub) *GameState{
    gs := hub.Rooms[c.RoomId].State
    fmt.Println("Updating state", gs)
    mapCoords(c, hub)
    playerCoords(c, gs, hub)

    if gs.HiderCount <= 0 {
        gs.Over = true
    }

    return gs
}

func mapCoords(c *Client, hub *Hub){
    x := c.Coords.X
    y := c.Coords.Y

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


func playerCoords(c *Client, gs *GameState, hub *Hub){
    x := c.Coords.X
    y := c.Coords.Y

    var boundary float64 = 0.0001
    // Determine boundary(radius) of each player.

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
     if (c.Seeker == false) {
     // score count for hiders
        c.Score = timePassed * 400
         // 400 for every minute hidden
     } else { 
     // score count for seeker
        c.Score += 1000
         // 1000 for every seeker caught
     }
}

func getRandomClientId(r *Room) string {
    ClientIds := []string{}

    for id, _ := range r.Clients {
        ClientIds = append(ClientIds, id)
    }

    // Choose random client id from the list of client ids after checking if client is a seeker already.
    for {
        randIndex := rand.Intn(len(ClientIds))
        if r.Clients[ClientIds[randIndex]].Seeker == false {
            return ClientIds[randIndex]
        }
    }
}

func getPlayerCount(r *Room) int {
    count := 0
    for _, c := range r.Clients {
        if c.Seeker == false {
            count++
        }
    }
    return count
}
