"use client"

import { Axios } from "@/app/api/Axios"
import Button from "@/app/components/Button"
import Input from "@/app/components/Input"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import Loading from "@/app/loading"
import { Textarea } from "@/app/components/Textarea"


const schema = z.object({
    email: z.email({ error: "The email is invalid." }),
    password: z.string().length(6, { error: "The password must be 6 characters long" })
})

type DataForm = z.infer<typeof schema>
export default function Page() {

    const router = useRouter()


    async function submit(data: DataForm) {

        const res = await Axios({
            url: "/api/login",
            method: "post",

            body: {
                email: data.email,
                password: data.password
            }
        })

        return res
    }


    const { mutate, isPending, isError } = useMutation({

        mutationFn: submit,


        onSuccess: () => {

            router.replace("/shop/products")

        },
    })

    const { handleSubmit, formState: { errors }, register } = useForm<DataForm>({
        resolver: zodResolver(schema)
    })


    if (isPending) return <Loading />
    return (

        <div className="w-full py-36 flex justify-center items-center">
            <form className="
            m-2 md:p-20
            bg-white 
            border-[1px] border-blue-200
            rounded-3xl  
            shadow-gray-500 shadow-md hover:shadow-xl
            w-full md:max-w-4/6 min-h-96
            flex flex-col justify-center items-center
            gap-2 

            " onSubmit={handleSubmit((data) => mutate(data))}>

                <Input type="email" placeholder="Email" {...register("email")}></Input>
                {errors.email && <p className="mb-2">{errors.email.message}</p>}

                <Input type="password" placeholder="Password" {...register("password")}></Input>
                {errors.password && <p className="mb-2">{errors.password.message}</p>}


                <Button type="submit">Send</Button>

            </form>

            {isError && <p>Error...</p>}
        </div>
    )
}