package main

import (
    "fmt"
    "github.com/gin-gonic/gin"
    "main/ws"
    // "main/auth"
)

func main() {
    fmt.Println("Server started")

    router := gin.Default()

    hub := ws.NewHub()
    wsHandler := ws.NewHandler(hub)
    go hub.Run()

    // Authentication endpoints
	// router.POST("/signin", auth.Signin)
	// router.POST("/welcome", auth.Welcome)
	// router.POST("/refresh", auth.Refresh)
	// router.POST("/logout", auth.Logout)

    // Websocket endpoints
    router.GET("/CreateRoom", wsHandler.CreateRoom)
    router.GET("/JoinRoom/:roomId", wsHandler.JoinRoom)

    router.Run()
}
