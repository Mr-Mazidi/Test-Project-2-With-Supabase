"use client"

import { useRouter } from "next/navigation";
import Button from "./Button";


export default function Error() {

    const router = useRouter()

    return (

        <div className="
        w-full min-h-screen 
        pt-20 gap-3
        flex flex-col justify-center items-center
        md:text-2xl
        ">

            <div className="text-red-600 text-center">

                <p>There is a problem</p>
                <p>Please try again later</p>

            </div>

            <Button onClick={() => router.refresh()}>
                Try Again
            </Button>

        </div>

    )
}