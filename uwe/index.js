const uWS = require('uWebSockets.js');
const { uuid } = require('uuidv4');

const port = 7777;

let SOCKETS = [];

const app = uWS.App()
    .ws('/ws', {
        compressoin: 0,
        maxPayloadLength: 16 * 1024 * 1024,
        idleTimeout: 60,
        open: (ws, req) => {
            console.log('client connected');
        },
        message: (ws, message, isBinary) => {
            console.log(`a connected client sent:${message}`);
            console.log(typeof message);
            console.log(message);
            console.log(new TextDecoder().decode(message));
            ws.send('hello client, received ur message');
        },
        close: (ws, code, message) => {
            console.log('client disconnected');
        }
    }).any('/*', (res, req) => {
        res.end('Nothing to see here!');
    })
    .listen(port, toke => {
        toke ?
            console.log(`Listening to port ${port}`) :
            console.log(`Failed to listen to port ${port}`);
    });





// const uWS = require('uWebSockets.js');
// const port = 9001;

// const app = uWS./*SSL*/App({
//     key_file_name: 'misc/key.pem',
//     cert_file_name: 'misc/cert.pem',
//     passphrase: '1234'
// }).ws('/*', {
//     /* Options */
//     compression: uWS.SHARED_COMPRESSOR,
//     maxPayloadLength: 16 * 1024 * 1024,
//     idleTimeout: 10,
//     /* Handlers */
//     upgrade: (res, req, context) => {
//         console.log('An Http connection wants to become WebSocket, URL: ' + req.getUrl() + '!');

//         /* This immediately calls open handler, you must not use res after this call */
//         res.upgrade({
//             url: req.getUrl()
//         },
//             /* Spell these correctly */
//             req.getHeader('sec-websocket-key'),
//             req.getHeader('sec-websocket-protocol'),
//             req.getHeader('sec-websocket-extensions'),
//             context);

//     },
//     open: (ws) => {
//         console.log('A WebSocket connected with URL: ' + ws.url);
//     },
//     message: (ws, message, isBinary) => {
//         /* Ok is false if backpressure was built up, wait for drain */
//         let ok = ws.send(message, isBinary);
//     },
//     drain: (ws) => {
//         console.log('WebSocket backpressure: ' + ws.getBufferedAmount());
//     },
//     close: (ws, code, message) => {
//         console.log('WebSocket closed');
//     }
// }).any('/*', (res, req) => {
//     res.end('Nothing to see here!');
// }).listen(port, (token) => {
//     if (token) {
//         console.log('Listening to port ' + port);
//     } else {
//         console.log('Failed to listen to port ' + port);
//     }
// })
