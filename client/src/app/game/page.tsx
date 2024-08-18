"use client";

import React, { useEffect, useState } from "react";
import Placeholder from "@/components/placeholder";
import CardList from "@/components/card-list";
import socket from "@/utils/socket";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";

const Game = () => {
  const [isNewRound, setIsNewRound] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [correctAnimal, setCorrectAnimal] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    socket.on("guess_animal", () => {
      console.log("flag to guess animal");
      setIsNewRound(true);
      setIsCorrectGuess(false);
      setCorrectAnimal("");
      setIsModalOpen(false);
    });

    socket.on("guess_result", (data: string) => {
      console.log(data);
      setIsCorrectGuess(data.startsWith("ACERTOU"));
      setCorrectAnimal(data.split(" ")[1]);
    });

    return () => {
      socket.off("guess_animal");
    };
  }, []);

  const handleGuessAnimal = () => {
    if (selectedAnimal !== "") {
      socket.emit("guess", {
        animal: selectedAnimal,
      });
      setSelectedAnimal("");
      setIsNewRound(false);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-slate-800 w-full h-screen py-8 flex flex-col justify-center items-center">
      {!isNewRound ? (
        <Placeholder text="Esperando uma nova rodada começar" />
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <CardList
            onCardClick={setSelectedAnimal}
            activeCard={selectedAnimal}
          />
          <div className="flex flex-col">
            <p className="text-3xl uppercase font-bold text-white mb-2">
              Selecionar animal
            </p>
            <Button
              onClick={handleGuessAnimal}
              variant="secondary"
              className="text-xl"
            >
              Apostar
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isModalOpen}>
        {correctAnimal ? (
          <DialogContent className="bg-slate-800">
            <p className="text-3xl font-medium uppercase text-white">
              Você {isCorrectGuess ? "acertou" : "errou"}!
            </p>
            <p className="text-xl text-white">
              O animal correto era {correctAnimal}
            </p>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          <DialogContent className="bg-slate-800">
            <Placeholder text="Esperando os outros jogadores apostarem" />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Game;
