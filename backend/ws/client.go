package ws

import (
    "github.com/gorilla/websocket"
    "log"
    "strconv"
    "strings"
)

type Client struct {
    Socket *websocket.Conn
    Coords *Coords
    Username    string `json:"username"`
    ClientId    string `json:"client_id"`
    RoomId      string `json:"room_id"`
    Seeker      bool `json:"seeker"`
    State       chan *GameState
}

// @Peiyee: Add variables relevant to the game state here.
type GameState struct {
    Over    bool `json:"over"`
    RoomId  string `json:"room_id"`
    Message string `json:"message"`
    // GameTimer int 
}

type Coords struct {
    X int `json:"x"`
    Y int `json:"y"`
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
        c.Socket.Close()
    }()
    
    _, coords, err := c.Socket.ReadMessage()

    if err != nil {
        if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
            log.Printf("error: %v", err)
        }
    }

    arr := strings.Split(string(coords), ",")
    x, _ := strconv.ParseFloat(arr[0], 64)
    y, _ := strconv.ParseFloat(arr[1], 64)

    handleCoords(c, x, y, hub)
    // @Colin Can we change this to int instead of String so that it's easier to compare values after without needing to convert back to int again ?
    // But one var can't hold two int values :/ 
}
