package ws

import (
    "net/http"

    "github.com/gin-gonic/gin"
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
