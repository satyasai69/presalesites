import ApproveUSDT from "./Usdtapprover";
import { abi } from "@/ABI/PresaleABI.json"
import {
    type BaseError,
    useWaitForTransactionReceipt,
    useWriteContract,
    useSendTransaction,

} from "wagmi";
import { useState } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { ButtonLoading } from "./loddindButton";
import { CustomButton } from "./customButton";




function Buywithcore({ coreamount }: { coreamount: number }) {
    const { data: hash, writeContract, isPending, isSuccess } = useWriteContract();
    const { address, isConnected } = useAccount();
    const coreamounteth = coreamount *  0.00000001 * 1e18
    // Convert to a string with fixed-point notation
const formattedAmount = coreamounteth.toFixed(8);
    const coreamountwithdec = Math.round(coreamount * 1e18) //coreamount * 1e18

    const formattedAmountdec =   Math.round(coreamount * 1e18) 

    const displayeth =  coreamount *  0.00000001 
    const formatdisplayeth = displayeth.toFixed(8);
   

    const handleclick = async () => {
       // const formattedAmountBigInt = BigInt(formattedAmount);
        try {
            await writeContract({ 
                abi,
                address: `0x3D33b56876BabF06bD98560F590953ff28C10A3D`, // IDO contract address 
                functionName: "buy",
                args: [],
                value: BigInt(coreamounteth) //* 1e18), // Set the value property to send ETH
            });

            console.log(coreamount, coreamountwithdec)


        } catch (error) {
            console.log(error)
        }
    } 

   
    return (
        <div className="">
            <h1 onClick={handleclick} >
            {formatdisplayeth} ETH
                {isPending ? (<ButtonLoading />) : (<CustomButton name="Buy" />)}
               
            </h1>

            {isSuccess ? <h1></h1> : <h1>{hash}</h1>}
        </div>
    )
}

export default Buywithcore;