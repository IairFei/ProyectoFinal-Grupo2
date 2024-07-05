import io, { Socket }  from 'socket.io-client';
import BASE_URL from '../services/conecction.js'

const socket = io(BASE_URL)

export default socket

// let socket

// export const conecctSocket = () =>{
//     socket = io(BASE_URL);
//     return socket
//}
// export const getSocket = () =>{
//     if(!socket){
//         throw new Error('Socket no conectado')
//     }
//     return socket
// }

// export const disconnectSocket = () =>{
//     if(socket){
//         socket.disconnect()
//     }
// }



