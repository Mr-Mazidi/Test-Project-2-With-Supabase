"use client"

import { useRouter } from "next/navigation"
import Button from "./components/Button"


export default function NotFound() {

    const router = useRouter()
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center  bgMain">

            <p className="text-2xl mb-3">We can not found this page</p>


            <Button bg="bg-red-500" onClick={() => router.replace("/")}>

                Go to main page

            </Button>

        </div>
    )

}