"use client"

import Button from "@/app/components/Button";
import { ProductsType } from "@/app/schema/TypeProducts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function CreateList({
    id,
    image,
    name,
    price,
}: Omit<ProductsType, "quantity">) {
    const router = useRouter()
    const [isShowImage, setIsShowImage] = useState<boolean>(false)
    const [imageError, setImageError] = useState<boolean>(false)

    return (
        <div className="grid grid-cols-2 border-2 rounded-3xl border-black/45 max-w-[360px] xl:w-sm">

            <div className="w-36 h-36 p-3 flex justify-center items-center">
                <div className="relative p-2 w-full h-full bg-black overflow-hidden rounded-3xl ">
                    <Image
                        onClick={() => setIsShowImage(true)}
                        fill
                        src={imageError ? "/Image/photo.jpg" : `${image}`}
                        alt={`Photo ${name}`}
                        onError={() => setImageError(true)}
                    />
                </div>
            </div>



            <div className="py-5 pr-3 w-full flex flex-col justify-between">

                <div>
                    <p>{name}</p>
                </div>

                <div>
                    <p>{price.toLocaleString("en-US")}<span className="text-red-700">$</span></p>
                </div>

                <div className="flex justify-end items-center w-full">
                    <Button onClick={() => router.push(`/shop/products/${id}`)}>See more</Button>
                </div>

            </div>

            {

                isShowImage && <div
                    onClick={() => setIsShowImage(false)}
                    className="fixed top-4 left-0 z-40 
                bg-gray-500/30 backdrop-blur-2xl   
                w-full h-full 
                flex justify-center items-center">

                    <div onClick={(e) => e.stopPropagation()} className="relative w-10/12 max-w-72 md:max-w-sm xl:max-w-md aspect-square">

                        <Image className="rounded-3xl bg-black" src={image || "/Image/photo.jpg"} alt="Plaese try again" fill />

                    </div>

                </div>

            }

        </div>
    )
}