package ws

type Room struct {
    ID      string        `json:"id"`
    Clients map[string]*Client `json:"clients"`
}

type Hub struct {
    Rooms map[string]*Room
    Register chan *Client
    Update chan *Client
    Broadcast chan *GameState
}

func NewHub() *Hub {
    return &Hub{
        Rooms: make(map[string]*Room),
        Register: make(chan *Client),
        Update: make(chan *Client),
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

        case client := <-h.Update:
            if _, ok := h.Rooms[client.RoomId]; ok {
                r := h.Rooms[client.RoomId]

                if _, ok := r.Clients[client.ClientId]; ok {
                    r.Clients[client.ClientId] = client
                }
            }

        case state := <-h.Broadcast:
            if _, ok := h.Rooms[state.RoomId]; ok {
                for _, client := range h.Rooms[state.RoomId].Clients {
                    client.State <- state
                }
            }
        }
    }
}
