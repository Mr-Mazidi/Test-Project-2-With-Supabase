import { NextResponse } from "next/server";
import { Axios } from "../Axios";
import { Get } from "../LoginCookies";
import axios from "axios";
import { RefreshAccessToken } from "../refreshAccessToken";

const key = process.env.NEXT_PUBLIC_KEY_SUPABASE

export async function GET() {

    const accessToken = await Get("access_token")

    try {
        const res = await Axios({
            url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products",
            method: "get",

            headers: {
                apikey: `${key}`,
                Authorization: `Bearer ${accessToken?.value}`
            }

        })

        return NextResponse.json({
            res
        })
    } catch (error) {

        if (axios.isAxiosError(error)) {

            if (error.response?.status === 401) {


                const newAccessToken = await RefreshAccessToken()

                const res = await Axios({
                    url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products",
                    method: "get",

                    headers: {
                        apikey: `${key}`,
                        Authorization: `Bearer ${newAccessToken}`
                    }

                })

                return NextResponse.json({
                    res
                })

            }

            return NextResponse.json({

                message: error.response?.data?.message,
                status: error.response?.status || 500
            })

        }

        return NextResponse.json({
            message: "Unknown error",
            status: 500
        })

    }

}
