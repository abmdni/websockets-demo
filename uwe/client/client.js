const ws = new WebSocket("ws://localhost:7777/ws");// use wss for production

// open fire whenever we are connected to server side
ws.addEventListener("open", () => {
    console.log("we are connected");
    ws.send("hello");

});
ws.addEventListener("message", e => {
    console.log("received data:");
    console.log(e.data);

});

