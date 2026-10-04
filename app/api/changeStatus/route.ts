import { NextResponse } from "next/server";
import { Axios } from "../Axios";
import axios from "axios";
import { RefreshAccessToken } from "../refreshAccessToken";
import { cookies } from "next/headers";

const key = process.env.NEXT_PUBLIC_KEY_SUPABASE

export async function PATCH(request: Request) {
    // تغییر وضعیت موجودی یا ناموجود بودن کالا

    const { id } = await request.json()
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) return NextResponse.json({
        message: "The access token is empty",
        success: false
    }, {
        status: 400
    })

    const deletedAt = new Date().toISOString();

    try {


        //Change status to false

        const res = await Axios({

            url: `https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products?id=eq.${id}`,
            method: "patch",

            body: {

                status: false,
                quantity: 0,
                deleted_at: deletedAt

            },

            headers: {
                apikey: `${key}`,
                Authorization: `Bearer ${accessToken}`,
                Prefer: "return=representation"
            }

        })

        return NextResponse.json({

            success: true

        }, {

            status: 200

        })


    } catch (error) {

        if (axios.isAxiosError(error)) {

            if (error.response?.status === 401) {

                try {

                    //Delete product
                    const newAccessToken = await RefreshAccessToken()
                    cookieStore.set("access_token", newAccessToken)

                    const res = await Axios({
                        url: `https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products?id=eq.${id}`,
                        method: "patch",

                        body: {

                            status: false,
                            quantity: 0,
                            deleted_at: deletedAt

                        },

                        headers: {
                            apikey: `${key}`,
                            Authorization: `Bearer ${newAccessToken}`,
                            Prefer: "return=representation"
                        }

                    })

                    return NextResponse.json({

                        success: true

                    }, {

                        status: 200

                    })

                } catch {

                    return NextResponse.json({

                        message: "Try again in a few minutes",
                        success: false

                    }, {

                        status: 500

                    })

                }

            }


            return NextResponse.json({

                message: error.response?.data?.message,
                success: false

            }, {

                status: error.response?.status

            })

        }


        return NextResponse.json({

            message: "Try again in a few minutes",
            success: false

        }, {

            status: 500

        })

    }

}
