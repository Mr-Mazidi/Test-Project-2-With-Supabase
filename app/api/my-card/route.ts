import { cookies } from "next/headers";
import { Axios } from "../Axios";
import { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { RefreshAccessToken } from "../refreshAccessToken";

const key = process.env.NEXT_PUBLIC_KEY_SUPABASE

export async function GET() {

    const [cookieStore] = await Promise.all([

        cookies(),

    ])

    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
        return NextResponse.json({

            message: "We can not found access token",
            success: false

        }, {

            status: 500

        })
    }

    // Res: [
    //   {
    //     id: 'a9b8e59f-bfc4-43b5-9f6d-2c404b1cd5a7',
    //     created_at: '2026-09-27T14:35:37.296359+00:00',
    //     status: 'paid',
    //     total_price: 2,
    //     items: [ [Object] ]
    //   },
    //   {
    //     id: 'd74353e3-08f5-4b5d-99a2-03966ead8868',
    //     created_at: '2026-09-27T14:34:18.629219+00:00',
    //     status: 'paid',
    //     total_price: 1510,
    //     items: [ [Object], [Object] ]
    //   }
    // ]

    try {


        const res = await Axios({

            url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/rpc/get_my_cart",
            method: "get",

            headers: {

                apikey: `${key}`,
                Authorization: `Bearer ${accessToken}`

            }

        })

        return NextResponse.json(res)

    } catch (error) {

        if (isAxiosError(error)) {

            if (error.response?.status === 401) {

                const newAccessToken = await RefreshAccessToken()
                cookieStore.set("access_token", newAccessToken)

                const res = await Axios({
                    url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/rpc/get_my_cart",
                    method: "get",

                    headers: {

                        apikey: `${key}`,
                        Authorization: `Bearer ${newAccessToken}`

                    }
                })

                return NextResponse.json(res)

            }


            return NextResponse.json({
                message: error.response?.data.message,
                success: false
            }, {
                status: error.response?.status
            })
        }

        return NextResponse.json({
            message: "The error is unspecified",
            success: false
        }, {
            status: 500
        })

    }
}