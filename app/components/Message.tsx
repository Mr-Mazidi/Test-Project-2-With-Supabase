"use client"

import clsx from "clsx";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function BoxMessage({
    status,
    setIsShow,
    isShow,
    message,
}: {
    status: boolean,
    setIsShow: Dispatch<SetStateAction<boolean>>,
    isShow: boolean,
    message: string
}) {


    useEffect(() => {

        if (!isShow) return

        const timer = setTimeout(() => {
            setIsShow(false)
        }, 5000)

        return () => {
            clearTimeout(timer)
        }

    }, [isShow, setIsShow])

    return (

        <div className={clsx(`
            fixed top-20 right-6 
            text-xs md:text-sm 
            w-52 md:w-80 
            flex flex-col justify-center items-center
            rounded-3xl
            overflow-hidden
            `, {

            "bg-green-600": status,
            "bg-red-600": !status

        })}>

            <div className="flex justify-between items-center ">

                <p className="p-3">

                    {message.length > 100 ? message.slice(0, 100) + "..." : message}

                </p>

                <button onClick={() => setIsShow(false)} className="m-2 p-1 
            border-[1.5px] border-black 
            md:border-2
            rounded-full
            
            ">
                    <X strokeWidth={1.5} />
                </button>

            </div>

            <div className="w-full h-1 bg-gray-700">
                <div className="changeWidth h-full bg-black"></div>
            </div>

        </div>
    )

}