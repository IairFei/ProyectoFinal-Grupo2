import io  from 'socket.io-client';

let socket

export const conecctSocket = () =>{
    socket = io('https://04a2-190-19-190-107.ngrok-free.app');
    return socket
}
export const getSocket = () =>{
    if(!socket){
        throw new Error('Socket no conectado')
    }
    return socket
}

export const disconnectSocket = () =>{
    if(socket){
        socket.disconnect()
    }
}



