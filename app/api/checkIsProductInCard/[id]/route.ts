import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { Axios } from "../../Axios"
import { isAxiosError } from "axios"
import { RefreshAccessToken } from "../../refreshAccessToken"
import { DeleteToken } from "../../LoginCookies"
import { redirect } from "next/navigation"


const key = process.env.NEXT_PUBLIC_KEY_SUPABASE

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {

    const [{ id: productId }, cookieStore] = await Promise.all([

        params,
        cookies()

    ])


    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
        return NextResponse.json({

            message: "The accessToken is invalid",
            success: false

        }, {
            status: 401
        })

    }



    const idProductNumber = Number(productId)

    if (!Number.isInteger(idProductNumber) || idProductNumber < 1) {

        return NextResponse.json({
            message: "This id product is invalid",
            success: false

        }, {
            status: 400
        })

    }

    //اینجا فانکشنی را در سوپابیس درست کردیم
    // که ایدی ایتم را می گیرد و به ما می گوید ایا این ایتم در سبد ما هست یا خیر و تداد ان ا می دهد


    try {

        const res = await Axios({
            url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/rpc/get_cart_item",
            method: "post",

            body: {

                p_product_id: idProductNumber

            },

            headers: {

                apikey: `${key}`,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"

            }


        })

        return NextResponse.json({
            res,
            message: "OK",
            success: true
        })

    } catch (error) {

        if (isAxiosError(error)) {

            if (error.response?.status === 401) {

                try {

                    const newAccessToken = await RefreshAccessToken()
                    cookieStore.set("access_token", newAccessToken)

                    const res = await Axios({
                        url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/rpc/get_cart_item",
                        method: "post",

                        body: {

                            p_product_id: idProductNumber

                        },

                        headers: {

                            apikey: `${key}`,
                            Authorization: `Bearer ${newAccessToken}`,
                            "Content-Type": "application/json"

                        }


                    })

                    return NextResponse.json({
                        res,
                        message: "OK",
                        success: true
                    })

                } catch {

                    await DeleteToken()
                    redirect("/auth/login")

                }
            }

            return NextResponse.json({

                message: error.response?.data.message,
                success: false

            }, {
                status: error.response?.status

            })
        }

        return NextResponse.json({

            message: "Please try again later",
            success: false

        }, {
            status: 500

        })

    }

}