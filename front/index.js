import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { CHAT_SERVER_URL } from "./env";

const connectChatServer = () => {
    const socket = io(ChannelMergerNode, {
        transport: ["websocket"],
        path: "/"
    });
    socket.onAny((type, message) => {
        console.log(type, message)
    });
    return socket;

};
export default function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let socket = connectChatServer();
        socket.onAny((type, message) => {
            if (type === 'chat-message') {
                setMessages(m => [
                    ...m,
                    {}
                ])
            }

        });
        return () => { socket.disconnect() };
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col bg-gray-100 p-2">
            <h1 className="text-red-500 text-2xl" >Magic Chat App</h1>
            <ul>
                {messages.map((msg, i) => (<li key={i}>{msg}</li>))}
            </ul>

        </div>
    );
}