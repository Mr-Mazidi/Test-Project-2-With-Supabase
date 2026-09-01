"use server"

import { cookies } from "next/headers";


export async function Get(name: string) {
    const cookiesStor = await cookies()

    return cookiesStor.get(name)

}


export async function setTokens({ accessToken, refreshToken }: { accessToken: string, refreshToken: string }) {
    const cookiesStor = await cookies()
    cookiesStor.set("access_token", `${accessToken}`, {

        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax"

    })

    cookiesStor.set("refresh_token", `${refreshToken}`, {

        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax"

    })

}


export async function DeleteToken() {

    const cookiesStor = await cookies()
    cookiesStor.delete("access_token")
    cookiesStor.delete("refresh_token")

}