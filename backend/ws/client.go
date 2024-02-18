package ws

import "github.com/gorilla/websocket"

type Client struct {
    socket *websocket.Conn
    coords *Coords
    username string `json:"username"`
    room_id string `json:"room_id"`
}

type Coords struct {
    X int `json:"x"`
    Y int `json:"y"`
}
