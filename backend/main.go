package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"database/sql"

	"github.com/golang-jwt/jwt/v5"

	_ "github.com/go-sql-driver/mysql"
	//"main/ws
)

func main() {
	fmt.Println("Server started")

	//router := gin.Default()

	//hub := ws.NewHub()
	//wsHandler := ws.NewHandler(hub)
	//go hub.Run()

	// Authentication endpoints
	// router.POST("/signin", auth.Signin)
	// router.POST("/welcome", auth.Welcome)
	// router.POST("/refresh", auth.Refresh)
	// router.POST("/logout", auth.Logout)

	// Websocket endpoints
	//router.GET("/CreateRoom", wsHandler.CreateRoom)
	//router.GET("/JoinRoom/:roomId", wsHandler.JoinRoom)

	//Marcus's shit don't touch COLLIN

	//uncomment to connect to josh's stuff
	//connectToDatabase()
	//defer db.Close()

	http.HandleFunc("/login", Login)
	http.HandleFunc("/signup", SignUp)

	log.Fatal(http.ListenAndServe(":8000", nil))

	//router.Run()

}

var db *sql.DB

// description of user
type User struct {
	Username     string `json:"username" validate:"required"`
	Password     string `json:"password" validate:"required"`
	Email        string `json:"email" validate:"required"`
	UserID       string `json:"userId" validate:"required"`
	Token        string `json:"token"`
	RefreshToken string `json:"refreshToken"`
}

// will be encoded to a JWT
type JWTClaims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

var jwtKey = []byte("secretstuffhere")

// Connect to the mySQL database
func connectToDatabase() {
	db, err := sql.Open("mysql", "root:<Eight2970622!>@tcp(127.0.0.1:3306)/test")
	if err != nil {
		panic(err.Error())
	}

	err = db.Ping()
	if err != nil {
		fmt.Println("Not connected to Josh's databse")
		panic(err.Error())
	}
	fmt.Println("connected to Josh's Database")
}

// Signup end point
func SignUp(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if user.Username == "" || user.Password == "" {
		http.Error(w, "Username and password are required", http.StatusBadRequest)
		return
	}

	//TEMPORARY WHILE DATABASE IS NOT UP
	RegisteredUsers[user.Username] = user.Password
	fmt.Println("Added new user")

	//I WOULD INSERT SHIT TO DATABASE HERE
}

func Login(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//Get expected password, and check if its correct
	expectedPassword, ok := RegisteredUsers[user.Username]
	if !ok || expectedPassword != user.Password {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	expirationTime := time.Now().Add(5 * time.Minute)

	claims := &JWTClaims{
		Username: user.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	//create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})

	w.Write([]byte(fmt.Sprintf("Welcome %s!", claims.Username)))

}

// For testing purposes, this would be in the database, but Josh hasn't finished it yet
var RegisteredUsers = map[string]string{
	"user1":  "password1",
	"user2":  "password2",
	"marcus": "table123",
}
