package main

import (
	"log"
	"net/http"

	_ "github.com/microsoft/go-mssqldb"


    "github.com/gin-gonic/gin"

	_ "github.com/go-sql-driver/mysql"
	"main/ws"
    "main/auth"
)

func main() {
	router := gin.Default()

	hub := ws.NewHub()
	wsHandler := ws.NewHandler(hub)
	go hub.Run()

	// Websocket endpoints
	router.POST("/ws/createRoom", wsHandler.CreateRoom)
	router.GET("/ws/joinRoom/:roomId", wsHandler.JoinRoom)
    router.GET("/ws/initiateGame/:roomId", wsHandler.InitiateGame)

    // Auth endpoints
	router.POST("/login", auth.Login)
	router.POST("/signup", auth.SignUp)
	router.GET("/refresh", auth.Refresh)
	router.POST("/logout", auth.Logout)

	router.Run()
	auth.ConnectToDatabase()

	log.Fatal(http.ListenAndServe(":8000", nil))

	//router.Run()

}

