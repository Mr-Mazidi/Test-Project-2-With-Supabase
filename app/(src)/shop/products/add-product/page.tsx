"use client"

import { Axios } from "@/app/api/Axios"
import Button from "@/app/components/Button"
import Input from "@/app/components/Input"
import { schema } from "@/app/schema/TypeAdd-product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

type DataFormType = z.infer<typeof schema>

export default function Page() {


    const router = useRouter()


    async function submit(data: DataFormType) {

        const res = await Axios({
            url: "/api/products/add-product",
            method: "post",

            body: {
                photo: data.photo,
                title: data.title,
                price: data.price,
                description: data.description,
            }

        })

        return res
    }


    const { register, handleSubmit, formState: { errors } } = useForm<DataFormType>({
        resolver: zodResolver(schema)
    })



    const { mutate, isPending, isError } = useMutation({

        mutationFn: submit,
        onSuccess: (data) => {
            console.log("DATA:", data)

            // router.replace("/shop/products")
        }

    })


    return (
        <div>

            <form onSubmit={handleSubmit((data) => mutate(data))}>

                <fieldset disabled={isPending}>


                    <Input placeholder="Photo" {...register("photo")} />
                    {errors.photo && <p>{errors.photo.message}</p>}

                    <Input placeholder="Title" {...register("title")} />
                    {errors.title && <p>{errors.title.message}</p>}

                    <Input placeholder="Price" {...register("price")} />
                    {errors.price && <p>{errors.price.message}</p>}

                    <Input placeholder="Description" {...register("description")} />
                    {errors.description && <p>{errors.description.message}</p>}

                    <Button type="submit">Create</Button>

                    {isError && <div>

                        <p> An error occurred </p>
                        <p> Please try again </p>

                    </div>}


                </fieldset>

            </form>

        </div>
    )
}