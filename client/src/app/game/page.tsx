"use client";

import React, { useEffect, useState } from "react";
import StartPlaceholder from "@/components/start-placeholder";
import socket from "@/utils/socket";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [correctAnimal, setCorrectAnimal] = useState("");

  useEffect(() => {
    socket.on("start_game", () => {
      setGameStarted(true);
    });

    socket.on("guess_animal", () => {
      console.log("flag to guess animal");
    });

    socket.on("guess_result", (data: string) => {
      console.log(data);
      setIsCorrectGuess(data.startsWith("ACERTOU"));
      setCorrectAnimal(data.split(" ")[1]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleGuess = () => {
    socket.emit("guess", {
      animal: "panda",
    });
  };

  return (
    <div className="bg-slate-800 w-full h-screen py-8 flex flex-col justify-center items-center">
      {!gameStarted ? <StartPlaceholder /> : <p>Game Started</p>}
    </div>
  );
};

export default Game;
