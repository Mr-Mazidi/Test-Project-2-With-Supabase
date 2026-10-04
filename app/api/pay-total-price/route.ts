import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Axios } from "../Axios";
import { isAxiosError } from "axios";
import { RefreshAccessToken } from "../refreshAccessToken";

const key = process.env.NEXT_PUBLIC_KEY_SUPABASE

export async function POST() {

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
        return NextResponse.json({

            message: "We can not found access token",
            success: false

        }, {

            status: 500

        })
    }

    try {

        const res = await Axios({
            url: `https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/rpc/checkout`,
            method: "post",
            headers: {

                apikey: `${key}`,
                Authorization: `Bearer ${accessToken}`,

            },
        });

        return NextResponse.json({

            success: true,
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
                    url: `https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/rpc/checkout`,
                    method: "post",
                    headers: {

                        apikey: `${key}`,
                        Authorization: `Bearer ${newAccessToken}`,

                    },
                });

                return NextResponse.json({

                    success: true,
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