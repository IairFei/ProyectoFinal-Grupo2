import io, { Socket }  from 'socket.io-client';
import BASE_URL from '../services/conecction.js'

const socket = io(BASE_URL)

export default socket




