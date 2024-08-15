"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-slate-800 w-full h-screen py-8 flex flex-col md:flex-row justify-start md:justify-center items-center space-y-4 md:space-x-4">
      <Image
        src="https://c.tenor.com/NVP2kRD7CHsAAAAC/tenor.gif"
        alt="dog dancing"
        width={200}
        height={200}
        unoptimized
      />
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-5xl font-bold text-white">Jogo do Bicho</h1>
        <Button
          onClick={() => router.push("/game")}
          className="text-xl"
          variant="secondary"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
}
