package ws

import (
	"log"
	"time"
)

var timePassed int64 = 0

func gameTimer(gameDuration string){
    
    switch gameDuration{
    case "15":
        for (timePassed < 15) {
            gametimer := time.NewTimer(1 * time.Minute)
            <-gametimer.C
            timePassed += 1
        }

    case "30":
        for (timePassed < 30) {
            gametimer := time.NewTimer(1 * time.Minute)
            <-gametimer.C
            timePassed += 1
        }

    case "45":
        for (timePassed < 45) {
            gametimer := time.NewTimer(1 * time.Minute)
            <-gametimer.C
            timePassed += 1
        }
    }
}



var topLeftX float64
var topLeftY float64
var topRightX float64
var topRightY float64
var bottomLeftX float64
var bottomLeftY float64
var bottomRightX float64
var bottomRightY float64

func mapBoundary(choice string){
    switch (choice){
    case "0":
        topLeftX = 90
        topLeftY = 9000
        
        topRightX = 9000
        topRightY = 9000
        
        bottomLeftX = 90
        bottomLeftY = 90
        
        bottomRightX = 900
        bottomRightY = 90
    
    case "1":
        topLeftX = 0
        topLeftY = 1000
        
        topRightX = 1000
        topRightY = 1000
        
        bottomLeftX = 0
        bottomLeftY = 0
        
        bottomRightX = 100
        bottomRightY = 0

    default:
        log.Printf("error: Map Invalid")
    }

}

func handleCoords(c *Client, x float64, y float64, hub *Hub){
    mapCoords(c, x, y, hub)
    // playerCoords(c, x, y, hub)
}

func mapCoords(c *Client, x float64, y float64, hub *Hub){
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

func(h *Handler)playerCoords(c *Client, x float64, y float64, hub *Hub){
    // mainPlayerRole := c.Query("seeker")
    // for _, client := range hub.Rooms[c.RoomId].Clients {
    //     otherPlayerRole := client.Query("seeker")

//     clientId := c.Param("clientId")
//     roomId := c.Param("roomId")
//     playerRole := c.Query("seeker")
//     score := c.Query("score")

    var mainPlayerRole bool = true
    var otherPlayerRole bool = false
    var oPX float64 = 0
    var oPY float64 = 0
    // using a temporary variable for otherPlayer's X and Y coordinate until I can get their coordinates properly
    var boundary float64 = 5

        if (mainPlayerRole == true) {
        // gotta check my values again
            if (mainPlayerRole != otherPlayerRole){
            // send seeker message to mainPlayerRole
            // send hider warning to otherPlayerRole
                if ((x + boundary) >= (oPX + boundary)) || ((oPX - boundary) >= (x - boundary)) {
                    time.Sleep(5 * time.Second)
                    // wait for 5 seconds
                        if (mainPlayerRole != otherPlayerRole){ 
                        // if hider and seeker still within each others boundary, considered caught
                            // playerScore(otherPlayerRole)
                            // decrement otherPlayerRole's score by 200
                            // update hider to seeker
                            // playerScore(mainPlayerRole) somehow increase their score
                        }
                } else if ((y + boundary) >= (oPY + boundary)) || ((oPY - boundary) >= (y - boundary)) {
                    time.Sleep(5 * time.Second)
                    // wait for 5 seconds
                        if (mainPlayerRole != otherPlayerRole){ 
                        // if hider and seeker still within each others boundary, considered caught
                            // playerScore(otherPlayerRole)
                            // decrement otherPlayerRole's score by 200
                            // update hider to seeker
                            // playerScore(mainPlayerRole) somehow increase their score
                        }
                }
            }
        }
}


// func (h *Handler) playerScore(c *gin.Context){
//     clientId := c.Param("clientId")
//     roomId := c.Param("roomId")
//     playerRole := c.Query("seeker")
//     score := c.Query("score")

//     scoreint, _ := strconv.ParseInt(score, 10, 64)

//     var val400 int64 = 400
//     var val1000 int64 = 1000

//     if (playerRole == "false") {
//     // hider
//         scoreint = timePassed * val400
//         // 400 for every minute hidden
//     } else { 
//     // seeker
//         scoreint += val1000
//         // 1000 for every seeker caught
//     }

//     updateScore := &PlayerScore{
//         ClientId: clientId,
//         RoomId: roomId,
//         Score: scoreint,
//     }

//     h.hub. Broadcast <- updateScore
//     // error message ws/game.go:142:25: cannot use updateScore (variable of type *PlayerScore) as *GameState value in send

// }


// func seekerStatus(){
//     // function called everytime a hider changes over to a seeker, numberOfHider decreases by 1 everytime
//     numberOfHiders -= 1
//     if (numberOfHiders == 0){
//         var Over bool = true
//     }
// }

