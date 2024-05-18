import React from 'react';
import { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ApproveUSDT from './Usdtapprover';
import BuywithUSDT from './buywithusdt';
import Buywithcore from './buywithcore';
import { CustomButton } from './customButton';
export function Sales() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(''); // Explicitly specify string type
  const [amount, setAmount] = React.useState(0);


  const handleAddToken = async () => { 
    try {
      // Check if the browser has the ethereum object
      if (window.ethereum) {
        // Send a request to MetaMask to add the token
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: '0x451D3209CBa95A5Ff939C4A638020C2902245443', // Replace with your token address
              symbol: 'QGC', // Replace with your token symbol
              decimals: 18, // Replace with your token decimals
              image: 'https://lavender-petite-spider-107.mypinata.cloud/ipfs/QmVaFsPhrJtXCqxHmyqsUR1WQijM3RPNAaLJZzM7mQq9tf', // Replace with your token image URL
            },
          },
        });

        // Alert the user that the token has been added
        alert('Token added to wallet!');
      } else {
        alert('Please install MetaMask or another Ethereum wallet to use this feature.');
      }
    } catch (error) {
      console.error('Error adding token:', error);
    }
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(event.target.id);
  };



  const renderButtons = () => {
    if (selectedPaymentMethod === 'core') {
      return (
        <>

          <Buywithcore coreamount={amount} />
        </>

      );
    } else if (selectedPaymentMethod === 'usdt') {
      return (
        <>
          <div className="">
            <ApproveUSDT />
          </div>
          <div className="ml-3">

            <BuywithUSDT usdtamount={amount} />
          </div>

        </>
      );
    }
    // Handle other payment methods if needed
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="pb-0">
        <CardTitle> QGC pre sale</CardTitle>
        <CardDescription>Enter the amount of QGC you want to buy on pre sale.</CardDescription>
        <div onClick={handleAddToken}>
          <CustomButton name="add to wallet" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-1.5">
          <Label className="text-sm" htmlFor="tokens">
            Tokens
          </Label>
          <Input id="tokens" placeholder="Enter amount of QGC" onChange={(e) => setAmount(Number(e.target.value))} />
        </div>

        <Buywithcore coreamount={amount} /> 
       
      </CardContent>
      <CardFooter>
        {renderButtons()}
      </CardFooter>
    </Card>
  );
}


/** 108       <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Input
                className="h-4 w-4"
                id="core"
                name="payment"
                type="radio"
                checked={selectedPaymentMethod === 'core'}
                onChange={handlePaymentMethodChange}
              />
              <Label className="ml-2 text-sm" htmlFor="core">
                CORE
              </Label>
            </div>
            <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Input
                className="h-4 w-4"
                id="usdt"
                name="payment"
                type="radio"
                checked={selectedPaymentMethod === 'usdt'}
                onChange={handlePaymentMethodChange}
              />
              <Label className="ml-2 text-sm" htmlFor="usdt">
                USDT
              </Label>
            </div>
          </div>
          </div>
      
        </div> */



          /** const renderButtons = () => {
    if (selectedPaymentMethod === 'core') {
      return (
        <>

          <Buywithcore coreamount={amount} />
        </>

      );
    } else if (selectedPaymentMethod === 'usdt') {
      return (
        <>
          <div className="">
            <ApproveUSDT />
          </div>
          <div className="ml-3">

            <BuywithUSDT usdtamount={amount} />
          </div>

        </>
      );
    }
    // Handle other payment methods if needed
  }; */
