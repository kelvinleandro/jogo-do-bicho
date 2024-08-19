import { io } from "socket.io-client";

const PORT = process.env.PORT || 5000;
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`;
const socket = io(SERVER_URL);

export default socket;
