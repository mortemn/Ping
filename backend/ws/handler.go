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

type InitiateGameRequest struct {
    Timer string `json:"timer"`
    Map string `json:"map"`
    Seeker string `json:"seeker"`
}

type CheckSeekerRequest struct {
    ID string `json:"id"`
}

type RoomResponse struct {
    ID string `json:"id"`
}

type ClientResponse struct {
    ID string `json:"id"`
    Username string `json:"username"`
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

func (h *Handler) InitiateGame(c *gin.Context){
    roomId := c.Param("roomId")
    var req InitiateGameRequest

    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    seekerNumber, err := strconv.Atoi(req.Seeker)

    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"Non integer detected in seeker": err.Error()})
    }

    // Assign seeker to seekerNumber of random clients.
    for i := 0; i < seekerNumber; i++ {
        hider := h.hub.Rooms[roomId].Clients[getRandomClientId(h.hub.Rooms[roomId])]
        hider.Seeker = true
    }

    hiderCount := len(h.hub.Rooms[roomId].Clients) - seekerNumber

    state := &GameState{
        Over: false,
        Started: true,
        RoomId: roomId,
        Message: "Game has started!",
        Timer: req.Timer,
        HiderCount: hiderCount,
    }

    h.hub.Broadcast <- state

    // go gameTimer(h.hub, req.Timer, req.ID)
    // mapBoundary(req.Map)

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

    client := &Client{
        Socket: conn,
        Coords: &Coords{
            X: 0,
            Y: 0,
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
        Timer: "0",
        HiderCount: 0,
    }

    h.hub.Register <- client
    h.hub.Broadcast <- update

    go client.Write()
    client.Read(h.hub)
}

func (h *Handler) GetRooms(c *gin.Context){
    rooms := make([]RoomResponse, 0)

    for _, room := range h.hub.Rooms {
        rooms = append(rooms, RoomResponse{
            ID: room.ID,
        })
    }

    c.JSON(http.StatusOK, rooms)
}

func (h *Handler) GetClients(c *gin.Context){
    var clients []ClientResponse
    roomId := c.Param("roomId")

    if _, ok := h.hub.Rooms[roomId]; !ok {
        clients = make([]ClientResponse, 0)
        c.JSON(http.StatusOK, clients)
    }

    for _, client := range h.hub.Rooms[roomId].Clients {
        clients = append(clients, ClientResponse{
            ID: client.ClientId,
            Username: client.Username,
        })
    }

    c.JSON(http.StatusOK, clients)
}

func (h *Handler) CheckSeeker(c *gin.Context){
    var req CheckSeekerRequest
    roomId := c.Param("roomId")

    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if _, ok := h.hub.Rooms[c.Param("roomId")]; !ok {
        c.JSON(http.StatusNotFound, gin.H{"error": "Room not found"})
        return
    }

    if _, ok := h.hub.Rooms[roomId].Clients[req.ID]; !ok {
        c.JSON(http.StatusNotFound, gin.H{"error": "Client not found"})
        return
    }

    if h.hub.Rooms[roomId].Clients[req.ID].Seeker == true {
        c.JSON(http.StatusOK, gin.H{"message": "You are a seeker!"})
    } else {
        c.JSON(http.StatusOK, gin.H{"message": "You are a hider!"})
    }
}
