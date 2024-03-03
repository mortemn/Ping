package ws

import (
	"net/http"

	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type Handler struct {
    hub *Hub
}

func NewHandler(hub *Hub) *Handler {
    return &Handler{hub: hub}
}

type CreateRoomRequest struct {
    ID string `json:"id"`
}

func (h *Handler) CreateRoom(c *gin.Context) {
    var req CreateRoomRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    h.hub.Rooms[req.ID] = &Room{
        ID: req.ID,
        Clients: make(map[string]*Client),
    }

    c.JSON(http.StatusOK, req)
}

// Upgrader to upgrade the HTTP connection to a WebSocket connection.
var upgrader = websocket.Upgrader{
    ReadBufferSize: 1024,
    WriteBufferSize: 1024,
    // Maybe add check origin later.
}

func (h *Handler) JoinRoom(c *gin.Context){
    conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    roomId := c.Param("roomId")
    clientId := c.Query("clientId")
    username := c.Query("username")

    xcoord, err := strconv.Atoi(c.Query("xcoord"))

    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"Non integer detected in xcoord": err.Error()})
        return
    }

    ycoord, err := strconv.Atoi(c.Query("ycoord"))

    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"Non integer detected in ycoord": err.Error()})
        return
    }

    client := &Client{
        Socket: conn,
        Coords: &Coords{
            X: xcoord,
            Y: ycoord,
        },
        Username: username,
        ClientId: clientId,
        RoomId: roomId,
        Seeker: false,
        State: make(chan *GameState),
    }

    update := &GameState{
        Over: false,
        RoomId: roomId,
        Message: "A new player has joined the game!",
    }

    h.hub.Register <- client
    h.hub.Broadcast <- update

    go client.Write()
    client.Read(h.hub)
}

func (h *Handler) GameInitiation(c *gin.Context){
    // function called, assign value to gameOver, starts timer, loop to check game status and run validator
    roomId := c.Param("roomId")
    timerChoice := c.Query("game_duration")
    mapChoice := c.Query("map_choice")
    gameOver := c.Query("over")
    
    gs := &GameState{}

    go gameTimer(timerChoice)
    mapBoundary(mapChoice)

    for {
        // for-loop to constantly check for game satutus (gameOver and hiderCount)
        if (gameOver == "true" || gs.HiderCount == 0){
            update := &GameState{
                Over: true,
                RoomId: roomId,
                Message: "Game is Over!",
                Timer: "0",
                HiderCount: 0,
                Scores: make(map[string]int64),
            }
            h.hub. Broadcast <- update
            break
        }
    }
}