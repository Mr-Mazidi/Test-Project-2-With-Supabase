"use server"

import { cookies } from "next/headers"
import { Axios } from "./Axios"

export async function RepeatSendEmailCode(email: string) {

    const cookieStore = await cookies()
    cookieStore.delete("email_code")

    const code = Math.floor(

        100000 + Math.random() * 900000

    ).toString()

    cookieStore.set("email_code", `${code}`, {

        httpOnly: true,
        maxAge: 60 * 2,
        path: "/",
        sameSite: "lax"

    })

    await Axios({

        url: "http://localhost:3000/api/send-code-to-email",
        method: "post",

        body: {

            email,
            code

        }
    })

}