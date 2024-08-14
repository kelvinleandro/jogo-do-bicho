"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { VolumeX, Volume2 } from "lucide-react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Play the audio when the component mounts
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };
  
  return (
    <div className="bg-slate-800 w-full h-screen py-8 flex flex-col md:flex-row justify-start md:justify-center items-center space-y-4 md:space-x-4">
      {/* <audio ref={audioRef} src="/home-sound.mp3" loop /> */}
      <Image
        src="https://c.tenor.com/NVP2kRD7CHsAAAAC/tenor.gif"
        alt="dog dancing"
        width={200}
        height={200}
        unoptimized
      />
      <h1 className="text-5xl font-bold text-white">Jogo do Bicho</h1>
      <Button onClick={() => {}} className="text-xl" variant="secondary">Start Game</Button>
      <Button className="absolute top-0 right-2" onClick={toggleMute} asChild variant="secondary" size="icon">
        {isMuted ? <VolumeX /> : <Volume2 />}
      </Button>
    </div>
  );
}
