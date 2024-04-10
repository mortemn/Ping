package ws

import (
	"log"
	"strconv"
	"strings"

	"github.com/gorilla/websocket"
)

type Client struct {
    Socket *websocket.Conn
    Coords *Coords
    Username    string `json:"username"`
    ClientId    string `json:"client_id"`
    RoomId      string `json:"room_id"`
    Seeker      bool `json:"seeker"`
    State       chan *GameState
    Score       int `json:"score"`
}

// @Peiyee: Add variables relevant to the game state here.
type GameState struct {
    Started bool `json:"started"`
    Over    bool `json:"over"`
    RoomId  string `json:"room_id"`
    Message string `json:"message"`
    Timer string `json:"timer"`
    HiderCount int `json:"hider_count"`
}

type GameSettings struct {
    RoomId  string `json:"room_id"`
    GameDuration string `json:"game_duration"`
    MapChoice string `json:"map_choice"`
    SeekerNumber int `json:"seeker_number"`
}

type Coords struct {
    X float64 `json:"x"`
    Y float64 `json:"y"`
}

// This function sends back state of the game to frontend as a response. 
func (c *Client) Write() {
    defer func() {
        c.Socket.Close()
    }()

    for {
        state, ok := <-c.State
        if !ok {
            return
        }

        c.Socket.WriteJSON(state)
    }
}

// Read any coordinate updates from the frontend and update the game state.
func (c *Client) Read(hub *Hub) {
    defer func() {
        hub.Unregister <- c
        c.Socket.Close()
    }()

    for {
    
        _, coords, err := c.Socket.ReadMessage()

        if err != nil {
            if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
                log.Printf("error: %v", err)
            }
            break
        }

        // Parse coordinates from message
        coordsStr := strings.Split(string(coords), ",")
        x, _ := strconv.ParseFloat(coordsStr[0], 64)
        y, _ := strconv.ParseFloat(coordsStr[1], 64)
        c.Coords = &Coords{X: x, Y: y}

        // Update game state
        hub.Broadcast <- updateState(c, hub) 
    }
}
