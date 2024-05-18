import React from 'react';
import { useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import { Button } from "./ui/button"
  import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Buywithcore from './buywithcore';

 export function Popup () {

    const [amount, setAmount] = React.useState(0);

  return(
  <Drawer>
  <DrawerTrigger className="w-full bg-[#22c55e] text-white">
    <Button className="w-full bg-[#22c55e] text-white" >Buy</Button></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
    <div className="flex flex-col space-y-1.5">
          <Label className="text-sm" htmlFor="tokens">
            Tokens
          </Label>
          <Input id="tokens" placeholder="Enter amount of QGC" onChange={(e) => setAmount(Number(e.target.value))} />
        </div> 
        <Buywithcore coreamount={amount} />
      
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
  )
  }
