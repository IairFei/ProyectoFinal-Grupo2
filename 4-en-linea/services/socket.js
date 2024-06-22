import { io } from 'socket.io-client';

// Crear una instancia de Socket.io y conectarse al servidor backend
const socket = io('http://localhost:3000');

export default socket;

