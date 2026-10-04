import { cookies } from "next/headers";
import { Axios } from "../Axios";
import { GetUser } from "../GetUser";
import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { RefreshAccessToken } from "../refreshAccessToken";

const key = process.env.NEXT_PUBLIC_KEY_SUPABASE
export async function GET(request: Request) {

    const url = new URL(request.url)

    const status = url.searchParams.get("status")

    const [cookieStore, { id }] = await Promise.all([

        cookies(),
        GetUser(),

    ])

    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken || !id) {
        return NextResponse.json({
            success: false,
            message: "The site can not get some information"
        }, {
            status: 500
        })
    }

    let requestUrl: string = ""

    switch (status) {

        case "active":

            requestUrl = `https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products?user_id=eq.${id}&status=eq.true`

            break;

        case "inactive":

            requestUrl = `https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products?user_id=eq.${id}&status=eq.false`

            break;

        default:

            requestUrl = `https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products?user_id=eq.${id}`

            break;
    }

    try {
        const res = await Axios({
            url: requestUrl,
            method: "get",

            headers: {
                apikey: `${key}`,
                Authorization: `Bearer ${accessToken}`
            }

        })

        return NextResponse.json({
            success: true,
            message: "Successfully",
            res
        }, {
            status: 200
        })

    } catch (error) {

        if (isAxiosError(error)) {
            if (error.response?.status === 401) {

                const newAccessToken = await RefreshAccessToken()
                cookieStore.set("access_token", newAccessToken)

                const res = await Axios({
                    url: requestUrl,
                    method: "get",

                    headers: {

                        apikey: `${key}`,
                        Authorization: `Bearer ${newAccessToken}`

                    }

                })

                return NextResponse.json({
                    success: true,
                    message: "Successfully",
                    res
                }, {
                    status: 200
                })
            }

            return NextResponse.json({
                success: false,
                message: error.response?.data.message,

            }, {
                status: error.response?.status
            })
        }

        return NextResponse.json({
            success: false,
            message: "Try again in last minuts",

        }, {
            status: 500
        })
    }
}