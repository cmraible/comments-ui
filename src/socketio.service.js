import {io} from 'socket.io-client';

let socket;

export const initiateSocketConnection = () => {
    socket = io('http://localhost:3628/');
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    } 
};