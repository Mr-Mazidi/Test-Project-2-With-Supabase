"use client"
//باید استایل را درست کنی بعدش هم باید درخواستی که به route می رود را درست کنی چون مقدار های جدید را نمی گیرد
import { Axios } from "@/app/api/Axios"
import { convertToWebp } from "@/app/api/convertToWebp"
import Button from "@/app/components/Button"
import Input from "@/app/components/Input"
import Option from "@/app/components/Option"
import Select from "@/app/components/Select"
import { schema } from "@/app/schema/TypeAdd-product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type DataFormType = z.infer<typeof schema>

export default function Page() {

    const [file, setFile] = useState<null | File>(null)
    const router = useRouter()


    async function submit(data: DataFormType) {

        const imageWebp = await convertToWebp(data.image)

        const formData = new FormData()

        formData.append("image", imageWebp)
        formData.append("name", data.title)
        formData.append("price", data.price)
        formData.append("quantity", data.quantity)
        formData.append("description", data.description)
        formData.append("category", data.category)

        const res = await Axios({
            url: "/api/products/add-product",
            method: "post",

            body: formData

        })

        return res
    }


    const { register, handleSubmit, formState: { errors } } = useForm<DataFormType>({
        resolver: zodResolver(schema)
    })


    const { mutate, isPending, isError } = useMutation({

        mutationFn: submit,

        onSuccess: () => {

            router.replace("/shop/products")

        }

    })


    return (

        <form className="bgMain w-full min-h-screen py-28" onSubmit={handleSubmit((data) => mutate(data))}>

            <fieldset className="w-full flex flex-col justify-center items-center gap-3" disabled={isPending}>

                <label htmlFor="image" className="relative hover:scale-95 w-40 h-40 bg-gray-900 rounded-3xl">

                    <Image className="p-3" src={file ? URL.createObjectURL(file) : "/Image/image-add.webp"} alt="Piiture" fill />

                </label>
                {errors.image && <p>{String(errors.image.message)}</p>}

                <Input size="not" type="file" accept="image/*" className="hidden" id="image"{...register("image", {

                    onChange: (e) => {
                        console.log("SELECTED FILE:", e.target)
                        setFile(e.target.files?.[0] ?? null)
                    }

                })} />


                <Input placeholder="Title" {...register("title")} />
                {errors.title && <p>{errors.title.message}</p>}

                <Input placeholder="Price" {...register("price")} />
                {errors.price && <p>{errors.price.message}</p>}

                <Input placeholder="Quantity" {...register("quantity")} />
                {errors.quantity && <p>{errors.quantity.message}</p>}

                <Input className="h-10" placeholder="Description" {...register("description")} />
                {errors.description && <p>{errors.description.message}</p>}


                <Select
                    {...register("category")}>
                    <Option value="">Select category</Option>
                    <Option value="Clothing">Clothing</Option>
                    <Option value="Shoes">Shoes</Option>
                    <Option value="Bags">Bags</Option>
                    <Option value="Electronics">Electronics</Option>
                    <Option value="Books">Books</Option>
                    <Option value="Food">Food</Option>
                    <Option value="Fruits">Fruits</Option>
                    <Option value="Tools">Tools</Option>
                    <Option value="Watches">Watches</Option>
                </Select>

                {errors.category && <p>{errors.category.message}</p>}

                <Button type="submit">Create</Button>

                {isError && <div className="mt-8 text-center text-red-600">

                    <p> An error occurred </p>
                    <p> Please try again </p>

                </div>}


            </fieldset>

        </form>

    )
}