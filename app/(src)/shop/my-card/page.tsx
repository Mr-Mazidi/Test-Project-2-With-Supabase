"use client"

import { Axios } from "@/app/api/Axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ProductsType } from "@/app/schema/TypeProducts"
import Button from "@/app/components/Button"
import { useMemo } from "react"
import Loading from "@/app/loading"
import Image from "next/image"
import CreatePublicListProducts from "@/app/components/CreatePublicListProducts"

type TypeProduct = {
    quantity: number,
    product_id: number
} & Omit<ProductsType, "id quantity">

export default function Page() {
    //quantity در انجا از سبد خردی کاربر می اید نه از اطلاعات محصول
    const queryClient = useQueryClient()

    const { data, isPending, isError } = useQuery({

        queryKey: ["products card"],

        queryFn: async () => {

            return await Axios({
                url: "/api/my-card",
                method: "get"
            })

        }

    })

    console.log("DATA:", data)

    const handlePay = async function () {
        try {

            await Axios({
                url: "/api/pay-total-price",
                method: "post"
            })

            queryClient.invalidateQueries({

                queryKey: ["products card"]

            })

        } catch (error) {
            console.log(error)
        }
    }


    const totalPrice = useMemo(() => {

        if (!data || data.length < 1) return 0

        return data.reduce(function (total: number, value: TypeProduct) {
            return total + (value.quantity * value.price)
        }, 0)

    }, [data])

    if (isPending) return <Loading />
    if (isError) return <p>Error ...</p>

    if (!data) return <div className="
    pt-20 px-10
    w-full min-h-screen 
    flex flex-col justify-center items-center 
    text-red-600 md:text-2xl text-center font-bold
    ">

        <p>There was a problem</p>
        <p>Try again later</p>

    </div>

    if (data.length < 1) return <div className="
    py-20 px-10
    w-full min-h-screen 
    flex flex-col justify-center items-center 
    text-red-600 md:text-2xl text-center font-bold
    ">

        <div className="relative w-10/12 aspect-square pb-4 max-w-sm">

            <Image src={"/Image/haveNoProducts.png"} alt="" fill />

        </div>

        <p>Please select some products and come back to this page.</p>

    </div>
    return (
        <div className="w-full h-full py-32 flex justify-center ">

            <div className="grid justify-center items-center w-auto
                        grid-cols-1 md:grid-cols-2 xl:grid-cols-3
                        px-3 gap-3
                        ">

                {
                    data.map(function (product: TypeProduct) {

                        return <div className="w-[300px] xl:w-sm" key={product.product_id}>
                            <CreatePublicListProducts

                                id={product.product_id}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                quantity={product.quantity}
                                status={product.status}

                            />

                        </div>

                    })
                }

                <div className="fixed bottom-0 left-0 z-30
                bg-blue-500 
                w-full h-10
                flex justify-between items-center
                px-4 py-6

                ">

                    <p>

                        Total price: {totalPrice.toLocaleString("en-US")} <span className="text-red-700">$</span>

                    </p>

                    <Button onClick={handlePay} bg="bg-blue-800" className="">
                        Pay
                    </Button>

                </div>
            </div>
        </div>
    )
}