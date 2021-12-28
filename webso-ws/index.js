const WebSocket = require("ws");

// start a websocket server
const wss = new WebSocket.Server({ port: 8002 });

wss.on("connection", ws => {
    // ws: single connection
    console.log("new client conneted");
    ws.on("message", (data) => {
        console.log(typeof data);
        console.log(`Client sent data ${data}`);
        ws.send(JSON.stringify(data.toString().toUpperCase()));
    });
    ws.on("close", () => {
        console.log("Client has disconnected");
    })
});
