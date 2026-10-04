"use client"

import { Axios } from "@/app/api/Axios"
import { GetUser } from "@/app/api/GetUser"
import Button from "@/app/components/Button"
import BoxMessage from "@/app/components/Message"
import Loading from "@/app/loading"
import { ProductsType } from "@/app/schema/TypeProducts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowLeftFromLine, PencilSparkles, Trash } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { use, useRef, useState } from "react"

type TypeDataProductInCard = { in_cart: boolean, quantity: number }

type TypeOldData = {
    numberOfProducts: {
        res: [
            TypeDataProductInCard
        ]
    },
    res: ProductsType
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {

    const router = useRouter()
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const queryClient = useQueryClient()
    const [isShowBox, setIsShowBox] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const { id } = use(params)


    const getDataProduct = async function () {
        return await Axios({

            url: `/api/products/${id}`,
            method: "get",

        })
    }


    const checkIsProductInCard = async function () {

        return await Axios({
            url: `/api/checkIsProductInCard/${id}`,
            method: "get"

        })

    }


    const { data, isPending, isError } = useQuery({
        queryKey: [`Information`, id],
        queryFn: async () => {

            const [res, numberOfProducts, { id: idUser }] = await Promise.all([
                getDataProduct(),
                checkIsProductInCard(),
                GetUser()
            ])

            return {

                res,
                numberOfProducts,
                idUser

            }
        }
    })

    const { mutate: updateQuantity } = useMutation({
        mutationFn: async ({ quantity }: { quantity: number }) => {
            return await Axios({
                url: "/api/update-product-card",
                method: "post",
                body: {
                    id,
                    quantity
                }
            })
        },

        retry: false,

        onMutate: () => {
            const oldData = queryClient.getQueryData(
                ["Information", id]
            ) as TypeOldData | undefined

            return {
                oldData
            }
        },

        onError: (_error, _variables, context) => {
            if (!context?.oldData) return

            queryClient.setQueryData(
                ["Information", id],
                context.oldData
            )
        }

    })


    if (isPending) return <Loading />
    if (isError) return <p>Error ... </p>
    if (!data) return <Loading />
    if (!data.res.success || !data.numberOfProducts.success) return <p>{data.res.message || data.numberOfProducts.message || "Please check Your internet and try again"}</p>

    const dataProductInCard: TypeDataProductInCard = data.numberOfProducts.res[0]
    const product: ProductsType = data.res.res[0]


    const handleAdd = () => {

        const oldData = queryClient.getQueryData(
            ["Information", id]
        ) as TypeOldData | undefined

        if (!oldData) return

        const currentQuantity = oldData.numberOfProducts.res[0].quantity

        let newQuantity;


        if (product.quantity === currentQuantity) return

        if (product.quantity < currentQuantity) {

            newQuantity = currentQuantity

        } else {

            newQuantity = currentQuantity + 1

        }


        queryClient.setQueryData(
            ["Information", id],
            {
                ...oldData,
                numberOfProducts: {
                    ...oldData.numberOfProducts,
                    res: [{
                        in_cart: true,
                        quantity: newQuantity
                    }]
                }
            }
        )


        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            updateQuantity({
                quantity: newQuantity
            })

            timer.current = null
        }, 500)


    }


    const handleReduce = () => {

        const oldData = queryClient.getQueryData(
            ["Information", id]
        ) as TypeOldData | undefined

        if (!oldData) return

        const currentQuantity = oldData.numberOfProducts.res[0].quantity

        const newQuantity = Math.max(currentQuantity - 1, 0)

        queryClient.setQueryData(
            ["Information", id],
            {
                ...oldData,
                numberOfProducts: {
                    ...oldData.numberOfProducts,
                    res: [{
                        in_cart: newQuantity > 0,
                        quantity: newQuantity < 1 ? 0 : newQuantity
                    }]
                }
            }
        )


        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            updateQuantity({
                quantity: newQuantity
            })

            timer.current = null
        }, 500)


    }


    const deleteProduct = async function () {

        const res = await Axios({

            url: "/api/changeStatus",
            method: "patch",

            body: {
                id
            }

        })



        if (res.success) {

            queryClient.invalidateQueries({
                queryKey: ["my-products"]
            })

            router.push("/shop/my-products")

        }

        if (!res.success) {

            setMessage(res.message || "")
            setIsShowBox(true)

        }


    }


    return (

        <div className="w-full min-h-screen bg-blue-50 flex justify-center py-16 ">

            <div className="max-w-11/12 md:max-w-7/12 bg-white flex flex-col items-center my-10 rounded-md shadow-xl shadow-gray-600">

                <div className="w-full p-4">

                    <Button size="button" onClick={() => {

                        if (window.history.length > 1) {
                            router.back()
                        } else {
                            router.push("/shop/products")
                        }

                    }}>

                        <ArrowLeftFromLine size={40} strokeWidth={1.75} />
                    </Button>

                </div>

                <div className="w-6/12">

                    <div className="w-full aspect-square relative rounded-md overflow-hidden bg-gray-500 shadow-md shadow-gray-600">

                        <Image src={product.image || "/Image/photo.jpg"} alt="Photo" fill className="object-contain" />

                    </div>

                </div>


                <div className="flex flex-col items-center">

                    <div className="text-center mb-3">

                        <p className="font-extrabold text-2xl max-w-32 text-center">{product.name}</p>

                    </div>

                    <div className="w-11/12
                    border-[0.5px] border-black/30 
                    p-5
                    rounded-md
                    shadow-gray-600 shadow-inner
                    ">

                        <p className="font-bold">Description: </p>
                        <p className="w-full break-all">{product.description}</p>

                        <span className="font-bold mt-3">Category: </span><span>{product.category}</span>

                    </div>

                    <div className="m-5 border-y-2 border-black/30 w-full text-center">

                        <p className="p-2">{product.price}<span className="text-red-500">$</span></p>

                    </div>
                    {product.status ?

                        (product.user_id !== data.idUser) ?

                            <div>

                                {dataProductInCard.in_cart ?

                                    <div className=" flex justify-center items-center gap-2  mb-4">
                                        <Button size="button" onClick={handleReduce}>
                                            -
                                        </Button>

                                        <p className="p-1 border-b-2 border-black">
                                            {dataProductInCard.quantity > product.quantity ? product.quantity : dataProductInCard.quantity}
                                        </p>

                                        <Button
                                            size="button"
                                            onClick={handleAdd}
                                            disabled={product.quantity <= dataProductInCard.quantity}
                                        >
                                            +
                                        </Button>

                                    </div>

                                    :

                                    <Button className="mb-4" onClick={handleAdd}>

                                        Buy this product

                                    </Button>

                                }
                            </div>

                            :

                            <div className="flex justify-center items-center gap-2 mb-6">

                                <Button onClick={deleteProduct} size="button" bg="bg-red-600"><Trash strokeWidth={1.5} /></Button>
                                <Button onClick={deleteProduct} size="button" bg="bg-yellow-300"><PencilSparkles strokeWidth={1.5} /></Button>

                            </div>

                        :

                        <div>

                            <Button className="mb-6" disabled >Non-existend</Button>

                        </div>


                    }
                </div>

            </div>

            {isShowBox && <BoxMessage isShow={isShowBox}
                setIsShow={setIsShowBox}
                status={false}
                message={message || "Try again in a few minutes"} />}

        </div>

    )
}