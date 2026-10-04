import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { Axios } from "../Axios"
import { isAxiosError } from "axios"
import { RefreshAccessToken } from "../refreshAccessToken"
import { DeleteToken } from "../LoginCookies"
import { redirect } from "next/navigation"

const key = process.env.NEXT_PUBLIC_KEY_SUPABASE
export async function POST(request: Request) {

    const [{ id: productId, quantity }, cookieStore] = await Promise.all([
        request.json(),
        cookies(),
    ])

    const idProductNumber = Number(productId)
    const quantityNumber = Number(quantity)

    if (!Number.isInteger(idProductNumber) || idProductNumber < 1) {

        return NextResponse.json({
            message: "This id products is invalid",
            success: false
        }, {
            status: 400
        })

    }

    if (!Number.isInteger(quantityNumber) || quantityNumber < 0) {

        return NextResponse.json({
            message: "This quantity products is invalid",
            success: false
        }, {
            status: 400
        })

    }

    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {

        return NextResponse.json({

            message: "The accessToken is invalid",
            success: false
        }, {
            status: 401

        })

    }

    try {

        const res = await Axios({
            url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/rpc/update_cart_quantity",
            method: "post",

            body: {

                p_product_id: idProductNumber,
                p_quantity: quantityNumber
            },

            headers: {
                apikey: `${key}`,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }

        })

        return NextResponse.json({
            message: "OK",
            success: true,
            res
        }, {
            status: 200
        })

    } catch (error) {

        if (isAxiosError(error)) {

            if (error.response?.status === 401) {
                try {

                    const newAccessToken = await RefreshAccessToken()
                    cookieStore.set("access_token", newAccessToken)

                    const res = await Axios({
                        url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/rpc/update_cart_quantity",
                        method: "post",
                        body: {

                            p_product_id: idProductNumber,
                            p_quantity: quantityNumber

                        },
                        headers: {
                            apikey: `${key}`,
                            Authorization: `Bearer ${newAccessToken}`,
                            "Content-Type": "application/json"
                        }
                    })

                    return NextResponse.json({
                        message: "OK",
                        success: true,
                        res
                    }, {
                        status: 200
                    })

                } catch {

                    await DeleteToken()
                    redirect("/auth/login")

                }
            }

            return NextResponse.json({

                success: false,
                message: error.response?.data.message

            }, {

                status: error.response?.status

            })
        }

        return NextResponse.json({

            success: false,
            message: "Please try again in later"

        }, {

            status: 500

        })

    }

}