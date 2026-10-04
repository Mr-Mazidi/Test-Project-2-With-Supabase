"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Page() {
    const router = useRouter()
    const [urlProfile, setUrlProfil] = useState<string>("")

    return (
        <div className="py-24  bgMain w-full min-h-screen flex justify-center items-center   ">

            <div className="bg-blue-100
            border-6 border-blue-200
            rounded-3xl 
            w-11/12 max-w-2xl min-h-screen 
            pb-16 
            ">

                <div className="flex flex-col items-center">

                    <label htmlFor="picture" className=" relative w-28 h-28
                      mt-20 rounded-full overflow-hidden">

                        <Image src={urlProfile || "/Image/photoProfile.jpg"} alt="Picture" fill />

                    </label>

                    <input onChange={(event) => {

                        const file = event.target.files?.[0]

                        if (!file) return

                        setUrlProfil(URL.createObjectURL(file))

                    }} type="file" accept="image/*" className="hidden" id="picture" />

                </div>

                <div>

                    <p className="text-2xl text-center">User</p>
                    <div className="pl-5 md:pl-20 mt-4">

                        <p>Age: {" 00 "}</p>
                        <p>Address: {" Iran "}</p>
                        <p>Phone Number: {"09*********"}</p>
                        <p>Password: {" ****** "}</p>
                        <p>Email: {" user@gmail.com"}</p>

                    </div>

                    <div className="m-10 gap-1 flex flex-col justify-center items-center">

                        <button
                            className="hover:scale-95 border-2  w-full p-1.5 rounded-xl"
                            onClick={() => router.push("/shop/my-products")}>

                            My Products

                        </button>

                        <button
                            className="hover:scale-95 border-2  w-full p-1.5 rounded-xl"
                            onClick={() => router.push("/shop/my-purchases")}>

                            My purchases

                        </button>

                    </div>
                </div>
            </div>

        </div>
    )
}