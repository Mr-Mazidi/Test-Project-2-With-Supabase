"use client"

import { Axios } from "@/app/api/Axios"
import { useQuery } from "@tanstack/react-query"
import CreateList from "./createListProducts"
import { ProductsType } from "@/app/schema/TypeProducts"
import Loading from "@/app/loading"
import Error from "@/app/components/Error"


export default function Page() {


    const { data, isPending, isError } = useQuery({
        queryKey: ["All products"],
        queryFn: async () => {

            return await Axios({
                url: "/api/products",
                method: "get",
            })

        }
    })



    if (isPending || !data) return <Loading />
    if (isError) return <Error />

    const products = data.res

    return (
        <div className="w-full h-full py-32 flex justify-center">

            <div className="grid justify-center items-center w-auto
        grid-cols-1 md:grid-cols-2 xl:grid-cols-3
        px-3 gap-3
        ">

                {
                    products.map(function (value: ProductsType) {
                        return <div className={`w-[300px] xl:w-sm ${value.quantity <= 0 && "opacity-50"}`} key={value.id}>

                            <CreateList
                                id={value.id}
                                image={value.image}
                                name={value.name}
                                price={value.price}

                            />

                        </div>
                    })
                }


            </div >

        </div>

    )
}