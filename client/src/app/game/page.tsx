"use client";

import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [correctAnimal, setCorrectAnimal] = useState("");

  // Usar useRef para manter a referência ao socket
  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, { transports: ['websocket'] });
    
    socketRef.current.on("start_game", () => {
      setGameStarted(true);
    });

    socketRef.current.on("guess_animal", () => {
      console.log("flag to guess animal");
    });

    socketRef.current.on("guess_result", (data: string) => {
      console.log(data);
      setIsCorrectGuess(data.startsWith("ACERTOU"));
      setCorrectAnimal(data.split(" ")[1]);
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  const handleGuess = () => {
    socketRef.current.emit("guess", {
      animal: "panda",
    });
  };

  return (
    <div className="bg-slate-800 w-full h-screen py-8 flex flex-col justify-center items-center">
      {!gameStarted ? <p>Awaiting for game to start</p> : <p>Game Started</p>}
    </div>
  );
};

export default Game;
