"use client"

import { Axios } from "@/app/api/Axios"
import { RepeatSendEmailCode } from "@/app/api/RepeatSendEmailCode"
import Button from "@/app/components/Button"
import Input from "@/app/components/Input"
import { DataRegisterSchema, OTPCodeRegister } from "@/app/schema/TypeData-register"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type DataRegisterType = z.infer<typeof DataRegisterSchema>
// باید تایمر دو دقسقه ای درست کنی برای زمان هایی که کد ارسال شده و کمی هم استایل ثبت نام را درست کن
export default function Page() {

    const router = useRouter()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [messageError, setMessageError] = useState<string>("")

    const [isEnterCode, setIsEnterCode] = useState<boolean>(false)
    const [isLoadingCodeEmail, setIsLoadingCodeEmail] = useState<boolean>(false)


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(DataRegisterSchema)
    })

    const { mutate, isPending } = useMutation({

        mutationKey: ["Register"],

        mutationFn: async (data: DataRegisterType) => {

            return await Axios({

                url: "/api/validationDataRegister",
                method: "post",

                body: {

                    email: data.email,
                    password: data.password

                }

            })
        },

        onSuccess() {

            setIsEnterCode(true)

        },
    })


    return (

        <div className="w-full py-36 flex flex-col justify-center items-center">

            <div className="
                    m-2 md:p-20
                    bg-white 
                    border-[1px] border-blue-200
                    rounded-3xl  
                  shadow-gray-500 shadow-md hover:shadow-xl
                    w-full md:max-w-4/6 min-h-96
                    flex flex-col justify-center items-center

                    ">

                {

                    isEnterCode ? (

                        <form onSubmit={async (e) => {

                            e.preventDefault()

                            const formData = new FormData(e.currentTarget)
                            const OTPCode = formData.get("OTPCode")

                            const result = OTPCodeRegister.safeParse(OTPCode)

                            if (!result.success) {

                                setMessageError(result.error.issues[0].message)
                                return

                            }

                            setMessageError("")

                            setIsLoadingCodeEmail(true)

                            try {

                                const res = await Axios({
                                    url: "/api/register",
                                    method: "post",
                                    body: {

                                        email,
                                        password,
                                        OTPCode,

                                    }
                                })

                                if (!res.success) {
                                    setMessageError(res.message)
                                    return
                                }

                                router.replace("/auth/login")

                            } catch (error) {

                                console.log(error)

                            } finally {

                                setIsLoadingCodeEmail(false)

                            }


                        }}

                            className="w-full h-full flex flex-col justify-center items-center gap-2"
                        >



                            <Input disabled={isLoadingCodeEmail} name="OTPCode" placeholder="Code" type="text" />

                            <div className="text-xs md:text-sm flex justify-center items-center gap-2">

                                <Button onClick={async () => {

                                    await RepeatSendEmailCode(email)


                                }} disabled={isLoadingCodeEmail} className="px-[22px]" type="button"><p>Resend</p></Button>

                                <Button disabled={isLoadingCodeEmail} type="submit">Register</Button>

                            </div>

                            <p className="text-blue-500 hover:pointer-coarse:" onClick={() => {

                                setIsEnterCode(false)

                            }}>Edit my email</p>

                            {messageError && <p className="text-red-600">{messageError}</p>}

                        </form>


                    ) : (

                        <form className="w-full h-full flex flex-col justify-center items-center" onSubmit={handleSubmit((data) => {

                            setEmail(data.email.toLowerCase())
                            setPassword(data.password)
                            mutate(data)

                        })}>

                            <fieldset className="w-full h-full flex flex-col justify-center items-center gap-2 " disabled={isPending}>

                                <Input placeholder="Email" type="email"{...register("email")} />
                                {errors.email && <p className="mb-2">{errors.email.message}</p>}

                                <Input placeholder="password" type="password" {...register("password")} />
                                {errors.password && <p className="mb-2">{errors.password.message}</p>}


                                <Button type="submit">Register</Button>

                            </fieldset>

                            {true && <p className="pt-2 text-red-600">Plesse Try Again Later</p>}

                        </form>

                    )

                }

            </div>
            <p>Do you have an account?<Link href={"/auth/login"} className="text-blue-500">Click here</Link></p>
        </div>

    )
}