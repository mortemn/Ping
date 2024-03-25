package auth

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "net/http"
    "time"
	"github.com/golang-jwt/jwt/v5"
    "log"
    "context"
    "github.com/gin-gonic/gin"
)

var Db *sql.DB

// description of user
type User struct {
	Username     string `json:"username" validate:"required"`
	Password     string `json:"password" validate:"required"`
	Email        string `json:"email" validate:"required"`
	Token        string `json:"token"`
	RefreshToken string `json:"refreshToken"`
	PlayerID     string `json:"playerID" validate:"required"`
}

// will be encoded to a JWT
type JWTClaims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

// Database information to connect
var db *sql.DB
var jwtKey = []byte("secretstuffhere")
var server = "pingproject.database.windows.net"
var port = 1433
var user = "CloudSA35d557de"
var password = "Eight82970622!"
var database = "ping"

// Connect to the mySQL database
func ConnectToDatabase() {
	//Build connection string
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s;", server, user, password, port, database)
	var err error

	//Create connection pool
	db, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal("Error creating connection pool: ", err.Error())
	}

	ctx := context.Background()
	err = db.PingContext(ctx)
	if err != nil {
		log.Fatal(err.Error())
	}

	fmt.Printf("Connected to Josh's database")
}

// Function that handles signup requests
func SignUp(c *gin.Context) {
	var user User
	err := json.NewDecoder(c.Request.Body).Decode(&user)

	if err != nil {
		http.Error(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	if user.Username == "" || user.Password == "" || user.Email == "" {
		http.Error(c.Writer, "username, password and email are all required", http.StatusBadRequest)
		return
	}

	//I WOULD INSERT SHIT TO DATABASE HERE
	_, err = db.Exec("INSERT INTO player (username, password, playerID, email) VALUES (@username, @password, @playerID, @email)", sql.Named("username", user.Username), sql.Named("password", user.Password), sql.Named("playerID", user.PlayerID), sql.Named("email", user.Email))
	if err != nil {
		http.Error(c.Writer, err.Error(), http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusCreated, user)
}

// Function that handles login requests
    func Login(c *gin.Context) {
	var user User
	err := json.NewDecoder(c.Request.Body).Decode(&user)

	if err != nil {
		c.JSON(http.StatusCreated, user)
		return
	}

	//Get usename and password from database
	var expectedPassword string
	err = db.QueryRow("SELECT password FROM player WHERE username=@username", sql.Named("username", user.Username)).Scan(&expectedPassword)
	if err != nil {
		http.Error(c.Writer, "Invalid Username or Password", http.StatusUnauthorized)
	}

	//If password does not equal the password in the database
	if expectedPassword != user.Password {
		http.Error(c.Writer, "Invalid Username or Password", http.StatusUnauthorized)
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	http.SetCookie(c.Writer, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})

	c.Writer.Write([]byte(fmt.Sprintf("Welcome %s!", claims.Username)))

}

func Refresh(c *gin.Context) {
	cookie, err := c.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
            c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	claims := &JWTClaims{}

	tkn, err := jwt.ParseWithClaims(cookie, claims, func(token *jwt.Token) (any, error) {
		return jwtKey, nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !tkn.Valid {
        c.JSON(http.StatusUnauthorized, gin.H{"Error": "Token is not valid"})
		return
	}

	if time.Until(claims.ExpiresAt.Time) > 30*time.Second {
        c.JSON(http.StatusBadRequest, gin.H{"Error": "Token expired"})
		return
	}

	expirationTime := time.Now().Add(5 * time.Minute)

	claims.ExpiresAt = jwt.NewNumericDate(expirationTime)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	http.SetCookie(c.Writer, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})

}

func Logout(c *gin.Context) {
	http.SetCookie(c.Writer, &http.Cookie{
		Name:    "token",
		Expires: time.Now(),
	})
}

