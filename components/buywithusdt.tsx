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




function BuywithUSDT({ usdtamount }: { usdtamount: number }) {
    const { data: hash, writeContract, isPending, isSuccess } = useWriteContract();
    const { address, isConnected } = useAccount();

    const handleclick = async () => {
        try {
            await writeContract({
                abi,
                address: `0x2b45002683704d4d14CB5D979a4C93d02844884a`, // IDO contract address
                functionName: "BuywithUsdt",
                args: [


                    usdtamount * 1e6,

                ],
            });


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1 onClick={handleclick} >
                {isPending ? (<ButtonLoading />) : (<CustomButton name="Buy with usdt" />)}
            </h1>
        </div>
    )
}

export default BuywithUSDT;