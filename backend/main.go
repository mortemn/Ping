package main

import (
    "fmt"
    "github.com/gorilla/websocket"
    "github.com/gin-gonic/gin"
    "main/ws"
    "main/auth"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize: 1024,
    WriteBufferSize: 1024,
}

func main() {
    fmt.Println("Server started")

    router := gin.Default()

    hub := ws.newHub()
    wsHandler := ws.NewHandler(hub)

    // Authentication endpoints
	router.POST("/signin", auth.Signin)
	router.POST("/welcome", auth.Welcome)
	router.POST("/refresh", auth.Refresh)
	router.POST("/logout", auth.Logout)

    // Websocket endpoints
    router.GET("/CreateRoom", hub.CreateRoom)

    router.Run()
}
