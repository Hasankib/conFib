package main

import (
    "fmt"
    "log"
    "net/http"
    "github.com/gorilla/websocket"
    "strconv"
    "strings"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize: 1024,
    WriteBufferSize: 1024,
    CheckOrigin: func(r *http.Request) bool { return true },
}

func reader(conn *websocket.Conn) {
    for {
        messageType, p, err := conn.ReadMessage()
        if err != nil {
            log.Println(err)
            return
        }

        fmt.Println(string(p))
        byteToInt, _ := strconv.Atoi(string(p))
        b := byteToInt
        //c := strconv.Itoa(b)
        //tin := make([]int, 5)
        c := make([]int,b*2)
        c = Sane(b)
        values := c
        valuesText := []string{}

        for i := range values {
            number := values[i]
            text := strconv.Itoa(number)
            valuesText = append(valuesText, text)
    }

    // Join our string slice.
        result := strings.Join(valuesText, ",")
        d := []byte(result)

        if err := conn.WriteMessage(messageType, d); err != nil {
            log.Println(err)
            return
        }
    }
}

func serveWs(w http.ResponseWriter, r *http.Request){
    fmt.Println(r.Host)

    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
    }

    reader(ws)
}

func setupRoutes() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Simple Server")
    })

    http.HandleFunc("/ws",serveWs)
}

func main() {
    setupRoutes()
    http.ListenAndServe(":8080", nil)
}
