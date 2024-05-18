import Image from "next/image";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import BuywithUSDT from "@/components/buywithusdt";
import { Sales } from "@/components/sales";
import { Prepage } from "@/components/prepage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
   


     
      <Prepage/>
     

    
  );
}

// <ConnectButton />

/** <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    > */