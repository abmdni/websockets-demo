const uWS = require('uWebSockets.js');
const { StringDecoder } = require("string_decoder");
const decoder = new StringDecoder('utf-8');

const ACTIONS_ENUM = {
    REFRESH_USERS_TO_CLIENTS: 'REFRESH_USERS_TO_CLIENTS',
    REFRESH_MESSAGES_TO_CLIENTS: 'REFRESH_MESSAGES_TO_CLIENTS',
    ADD_MESSAGE: 'ADD_MESSAGE',
    ADD_USER: 'ADD_USER',
}
const ROOMS_OF_CHAT = {
    GENERAL: 'CHAT/GENERAL'
};
let users = [];
let message = [];

const CHAT = {
    addUser: (ws, user) => {
        ws.uuid = user.uuid;

        users = [...users, user];
        ws.publish(ROOMS_OF_CHAT.GENERAL, {
            action: ACTIONS_ENUM.ADD_USER,
            data: {

            }
        });
    },
    addMessage: (ws, message) => {
        if (message) {
            messages = [...messages, message];
            ws.publish(ROOMS_OF_CHAT.GENERAL, JSON.stringify({
                action: ACTIONS_ENUM.REFRESH_MESSAGES_TO_CLIENTS,
                data: {
                    messages: messages
                }
            }));
        }

    },
    closeUSER: (app, ws) => {
        if (ws.uuid) {
            users = users.filter((u) => u.uuid !== ws.uuid);
            app.publish(ROOMS_OF_CHAT.GENERAL, JSON.stringify({
                action: ACTIONS_ENUM.REFRESH_USERS_TO_CLIENTS,
                data: {
                    users: users
                }
            }));
        }
    }
};
const app = uWS.App().ws('/*', {
    open: (ws, req) => {
        ws.subscribe(ROOMS_OF_CHAT.GENERAL);
    },
    message: (ws, message, isBinary) => {
        let json = decoder.write(Buffer.from(message));
        switch (json.action) {
            case ACTIONS_ENUM.ADD_MESSAGE:
                if (json.padStart.user) {
                    CHAT.ADD_User(ws, json.data.user);
                }
                break;
            case ACTIONS_ENUM.ADD_MESSAGE:
                if (json.data.message) {
                    CHAT.addMessage(json.data.message);
                }
                break;
            default:
                break
        }
    },
    close: (ws, code, message) => {
        CHAT.closeUSER(app, ws);
    }
});

app.listen(9001, (listenSocket) => {
    console.log('listening to port 9001');
});