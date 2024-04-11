package ws

import (
    "fmt"
)

type Room struct {
    ID      string        `json:"id"`
    Clients map[string]*Client `json:"clients"`
    State   *GameState 
}

type Hub struct {
    Rooms map[string]*Room
    Register chan *Client
    Unregister chan *Client
    Broadcast chan *GameState
}

func NewHub() *Hub {
    return &Hub{
        Rooms: make(map[string]*Room),
        Register: make(chan *Client),
        Unregister: make(chan *Client),
        Broadcast: make(chan *GameState, 10),
    }
}

func (h *Hub) Run() {
    for {
        select {
        case client := <-h.Register:
            if _, ok := h.Rooms[client.RoomId]; ok {
                r := h.Rooms[client.RoomId]


                if _, ok := r.Clients[client.ClientId]; !ok {
                    r.Clients[client.ClientId] = client
                }
            }

        case client := <-h.Unregister:
            if _, ok := h.Rooms[client.RoomId]; ok {
                if _, ok := h.Rooms[client.RoomId].Clients[client.ClientId]; ok {
                    if len(h.Rooms[client.RoomId].Clients) != 0 {
                        h.Broadcast <- &GameState{
                            Message: "User left the room",
                             
                        }
                    }
                }
            }

        case state := <-h.Broadcast:
            if _, ok := h.Rooms[state.RoomId]; ok {
                fmt.Println("Broadcasting to room: ", state.RoomId)
                for _, client := range h.Rooms[state.RoomId].Clients {
                    client.State <- state
                }
                h.Rooms[state.RoomId].State = state
                fmt.Println("Broadcasted to room: ", state.RoomId)
            }
        }
    }
}
