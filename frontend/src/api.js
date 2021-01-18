
/*var socket = new WebSocket("ws://localhost:8080/ws");
var x;
var change = false;

let connect = () => {
    console.log("Attempting Connection...");

    socket.onopen = () => {
        console.log("Successfully Connected");
    };
    socket.onmessage = (msg) => {
        console.log("yo");
        console.log(msg);
        x = msg;
        change = true
    };
    socket.onclose = (event) => {
        console.log("Socket Closed Connection: ", event);
    };
    socket.onerror = (error) => {
        console.log("Scoket Error: ", error)
    };
};

let sendMsg = msg => {
    change = false
    console.log("sending msg: ",msg);
    socket.send(msg);
};

export { connect, sendMsg, x, change };*/