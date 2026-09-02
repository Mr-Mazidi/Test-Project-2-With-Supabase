import { NextResponse } from "next/server"
import { Axios } from "../Axios"
import { setTokens } from "../LoginCookies"

const key = process.env.NEXT_PUBLIC_KEY_SUPABASE

export async function POST(request: Request) {

    const body = await request.json()


    const res = await Axios({
        url: "https://myvyvaldnehjhnveuohs.supabase.co/auth/v1/token?grant_type=password",
        method: "post",

        headers: {
            apikey: `${key}`
        },

        body: {
            email: body.email,
            password: body.password
        }
    })

    if (!res.refresh_token || !res.access_token) {

        return NextResponse.json(
            {
                message: "Do not have refresh token or access token"
            },
            {
                status: 500
            })

    }

    await setTokens({
        refreshToken: res.refresh_token,
        accessToken: res.access_token,
    })

    return NextResponse.json({

        message: "successfully",
    })


}