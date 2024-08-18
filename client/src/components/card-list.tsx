import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import AnimalCard from "./animal-card";
import { ANIMALS } from "@/constants/animals";

type Props = {
  onCardClick: (animal: string) => void;
  activeCard: string;
};

const CardList = ({ onCardClick, activeCard }: Props) => {
  return (
    <ScrollArea className="w-full md:w-[50vw] max-h-[450px]">
      <div className="grid gap-4 grid-cols-auto-fit">
        {Object.entries(ANIMALS).map(([text, imageUrl]) => (
          <AnimalCard
            key={text}
            text={text}
            imageUrl={imageUrl}
            active={text === activeCard}
            onClick={onCardClick.bind(this, text)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default CardList;
