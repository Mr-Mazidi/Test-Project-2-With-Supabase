import { NextResponse } from "next/server"
import { GetUser } from "../../GetUser"
import { z } from "zod"
import { schema } from "@/app/schema/TypeAdd-product"
import { Axios } from "../../Axios"
import { isAxiosError } from "axios"
import { cookies } from "next/headers"
import { RefreshAccessToken } from "../../refreshAccessToken"


type TypeBody = z.infer<typeof schema>

const key = process.env.NEXT_PUBLIC_KEY_SUPABASE

export async function POST(request: Request) {
    const user = await GetUser()

    if (!user.success) {
        return NextResponse.json({
            success: false,
            message: "error in get data user"
        }, {
            status: 500
        })
    }

    const body: TypeBody = await request.json()
    const result = schema.safeParse(body)
    const cookieStor = await cookies()
    const accessToken = cookieStor.get("access_token")?.value


    if (!accessToken) {

        return NextResponse.json({
            success: false,
            message: "The access token is not found"
        }, {
            status: 500
        })

    }

    if (!result.success) {
        return NextResponse.json({
            success: false,
            message: "Data is invalid"
        }, {
            status: 500
        })
    }
    const data = result.data




    try {

        const res = await Axios({
            url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products",
            method: "post",
            headers: {
                apikey: `${key}`,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                Prefer: "return=representation"
            },
            body: {
                user_id: user.id,
                image: data.photo,
                name: data.title,
                price: Number(data.price),
                description: data.description,

            }
        })

        return NextResponse.json({
            message: "successfully",
            res: res
        }, {
            status: 200
        })

    } catch (error) {

        if (isAxiosError(error)) {

            if (error.response?.status === 401) {

                const newAccessToken = await RefreshAccessToken()


                const res = await Axios({
                    url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products",
                    method: "post",
                    headers: {
                        apikey: `${key}`,
                        Authorization: `Bearer ${newAccessToken}`,
                        "Content-Type": "application/json",
                        Prefer: "return=representation"
                    },
                    body: {
                        user_id: user.id,
                        image: body.photo,
                        name: body.title,
                        price: Number(body.price),
                        description: body.description,

                    }
                })

                return NextResponse.json({
                    message: "successfully",
                    res: res
                }, {
                    status: 200
                })


            }

            return NextResponse.json({
                message: error.response?.data.message
            }, {
                status: error.response?.status
            })

        }

        return NextResponse.json({
            message: "Try Again"
        }, {
            status: 500
        })

    }

}