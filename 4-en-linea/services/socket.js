import { io } from 'socket.io-client';

// Crear una instancia de Socket.io y conectarse al servidor backend
const socket = io('http://192.168.0.12:3000/');

export default socket;

