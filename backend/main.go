package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	_ "github.com/microsoft/go-mssqldb"

	"github.com/gin-gonic/gin"

	"main/auth"
	"main/ws"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	router := gin.Default()
	
	// CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3001"}
	router.Use(cors.New(config))

	hub := ws.NewHub()
	wsHandler := ws.NewHandler(hub)
	go hub.Run()
	auth.ConnectToDatabase()

	// Websocket endpoints
	router.POST("/ws/createRoom", wsHandler.CreateRoom)
    router.POST("/ws/initiateGame/:roomId", wsHandler.InitiateGame)
    router.GET("/ws/joinRoom/:roomId", wsHandler.JoinRoom)

    router.GET("ws/getRooms", wsHandler.GetRooms)
    router.GET("ws/getClients/:roomId", wsHandler.GetClients)
    router.GET("ws/checkSeeker/:roomId", wsHandler.CheckSeeker)

    // Auth endpoints
	router.POST("/login", auth.Login)
	router.POST("/signup", auth.SignUp)
	router.GET("/refresh", auth.Refresh)
	router.POST("/logout", auth.Logout)

	router.Run()

	log.Fatal(http.ListenAndServe(":8000", nil))

	//router.Run()

}

