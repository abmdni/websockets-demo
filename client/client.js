const ws = new WebSocket("ws://localhost:8002");// use wss for production

// open fire whenever we are connected to server side
ws.addEventListener("open", () => {
    console.log("we are connected");
    ws.send("hello");

});
ws.addEventListener("message", e => {
    console.log("received data:");
    console.log(e.data);
    let str = String.fromCharCode(...JSON.parse(e.data).data);
    console.log(str);

});

