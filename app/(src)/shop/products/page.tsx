"use client"


import { Axios } from "@/app/api/Axios"
import { useQuery } from "@tanstack/react-query"


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

    console.log("data:", data)
    if (isPending) return <p>Loading ... </p>
    if (!data) return <p>You have not internet</p>
    if (isError) return <p>Error ... </p>
    return (

        <div>



        </div>

    )
}