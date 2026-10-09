"use client"

import Button from "@/app/components/Button";
import { ProductsType } from "@/app/schema/TypeProducts";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function CreatePublicListProducts({

    id,
    image,
    name,
    price,
    quantity,
    status

}: ProductsType) {

    const router = useRouter()
    console.log(status)

    return (
        <div className={`${!status && "opacity-50"} h-52 grid justify-center items-center grid-cols-2 border-2 rounded-3xl border-black/45 max-w-sm xl:w-sm `}>

            <div className="relative w-11/12 aspect-square p-3 ml-3 flex justify-center items-center">

                <Image className="rounded-3xl overflow-hidden" fill src={image || "/Image/photo.webp"} alt={`Photo ${name}`} />

            </div>



            <div className="ml-3 py-5 pr-3 w-full flex flex-col justify-between">

                <div>
                    <p className="font-bold">{name}</p>
                </div>

                <div>

                    <p> Quantity:
                        {quantity === 0 ? (
                            <>
                                <br />
                                <span className="text-red-600">Non existent</span>
                            </>
                        ) : (
                            quantity.toLocaleString("en-US")
                        )}
                    </p>
                </div>

                <div className="py-1.5">

                    <p>{price.toLocaleString("en-US")}<span className="text-red-700">$</span></p>

                </div>

                <div className="flex justify-between items-center w-full">
                    <Button onClick={() => router.push(`/shop/products/${id}`)}>See more</Button>
                </div>

            </div>



        </div >
    )
}