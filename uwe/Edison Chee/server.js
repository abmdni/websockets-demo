const uWS = require('./uws.js');
const { uuid } = require('uuidv4');
const port = 7777;

let SOCKETS = [];

const app = uWS.App()
    .ws('/ws', {
        // config
        compression: 0,
        maxPayloadLength: 16 * 1024 * 1024,
        idleTimeout: 60,

        open: (ws, req) => {
            // this handler is called when a client opens a ws connection with the server
            ws.id = uuid();
            ws.username = createName(getRandomInt());
            SOCKETS.push(ws);

            let msg = {
                body: {
                    id: ws.id,
                    name: ws.username
                }
            }
            ws.send(JSON.stringify(msg));
        },

        message: ws => {
            // called when a client sends a message
        },

        close: (ws, code, message) => {
            // called when a ws connection is closed
        }
    }).listen(port, token => {
        token ?
            console.log(`Listening to port ${port}`) :
            console.log(`Failed to listen to port ${port}`);
    });