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

	router.Run()

	http.HandleFunc("/login", auth.Login)
	http.HandleFunc("/signup", auth.SignUp)
	http.HandleFunc("/refresh", auth.Refresh)
	http.HandleFunc("/logout", auth.Logout)

	auth.ConnectToDatabase()

	log.Fatal(http.ListenAndServe(":8000", nil))

	//router.Run()

}

