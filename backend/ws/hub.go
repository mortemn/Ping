package ws

type Room struct {
    ID      string        `json:"id"`
    Clients map[string]*Client `json:"clients"`
}

type Hub struct {
    Rooms map[string]*Room
}

func newHub() *Hub {
    return &Hub{
        Rooms: make(map[string]*Room),
    }
}
