import { abi } from "@/ABI/USDTABI.json"
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



function ApproveUSDT() {
    const { data: hash, writeContract, isPending, isSuccess } = useWriteContract();
    const { address, isConnected } = useAccount();
    const USTapprovelamount = 98765432345678909876543456789

    const handleclick = async () => {
        try {
            await writeContract({
                abi,
                address: `0x900101d06A7426441Ae63e9AB3B9b0F63Be145F1`, //USDT token address
                functionName: "approve",
                args: [
                    address, //spender contract address

                    USTapprovelamount,

                ],
            });


        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>

            <h1 onClick={handleclick} >
                {isPending ? (<ButtonLoading />) : (<CustomButton name="ApproveUSDT" />)}
            </h1>
            <div>{isSuccess && <div>Transaction successful!</div>}</div>
        </div>
    )
}

export default ApproveUSDT;