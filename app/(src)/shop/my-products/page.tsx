"use client"
// createlist ها را درسست کن 
import { Axios } from "@/app/api/Axios"
import Loading from "@/app/loading"
import { ProductsType } from "@/app/schema/TypeProducts"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import Select from "@/app/components/Select"
import Option from "@/app/components/Option"
import { useState } from "react"
import CreatePublicListProducts from "@/app/components/CreatePublicListProducts"


export default function Page() {

    const [statusProducts, setStatusProducts] = useState<string>("")
    const queryClient = useQueryClient()

    const { data, isPending, isError } = useQuery({

        queryKey: ["my-products", statusProducts],
        queryFn: async () => {

            const res = await Axios({

                url: `/api/my-products?status=${statusProducts}`,
                method: "get",

            })

            return res
        }
    })

    const changeStatusRequest = (value: string) => {

        setStatusProducts(value)

        queryClient.invalidateQueries({
            queryKey: ["my-products", statusProducts]
        })

    }

    if (isPending) return <Loading />
    if (isError || !data) return <p>Error ...</p>

    const products = data.res

    if (products.length < 1) return <div className="py-20 w-full min-h-screen flex flex-col justify-center items-center">

        <div className="relative w-56 aspect-square md:w-sm ">

            <Image src={"/Image/haveNoProducts.png"} alt="Picture" fill />

        </div>

        <p className="text-red-700 md:text-2xl">You have no products</p>

    </div>

    return (

        <div className="py-32 flex flex-col justify-center items-center">


            <div className="w-full flex justify-center items-center mb-5 max-w-sm">
                <Select
                    value={statusProducts}
                    onChange={(e) => changeStatusRequest(e.target.value)} >

                    <Option value={""}>All Products</Option>
                    <Option value={"active"}>Active Products</Option>
                    <Option value={"inactive"}>Inactive products</Option>

                </Select>
            </div>

            <div className="w-full h-full flex justify-center">

                <div className="grid justify-center items-center w-auto
        grid-cols-1 md:grid-cols-2 xl:grid-cols-3
        px-3 gap-3
        ">

                    {
                        products.map(function (product: ProductsType) {

                            return <div className="w-[300px] xl:w-sm" key={product.id}>
                                <CreatePublicListProducts

                                    id={product.id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    quantity={product.quantity}
                                    status={product.status}

                                />
                            </div>
                        })
                    }


                </div >

            </div>
        </div>
    )
}