import { NextResponse } from "next/server";
import { Axios } from "../../Axios";
import { isAxiosError } from "axios";
import { RefreshAccessToken } from "../../refreshAccessToken";
import { cookies } from "next/headers";

const key = process.env.NEXT_PUBLIC_KEY_SUPABASE
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access-token")?.value
    const { id } = await params
    console.log(accessToken)
    if (!Number(id)) {
        return NextResponse.json({

            success: false,
            message: "This id products is invalid."

        }, {
            status: 500
        })
    }

    try {
        const res = await Axios({

            url: `https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products?id=eq.${id}`,
            method: "get",
            headers: {
                apikey: `${key}`,
                Authorization: `Bearer ${accessToken}`

            }
        })

        return NextResponse.json({

            res,
            success: true,
            message: "successfully"

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
                        url: `https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products?id=eq.${id}`,
                        method: "get",
                        headers: {
                            apikey: `${key}`,
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    })

                    return NextResponse.json({

                        res,
                        success: true,
                        message: "successfully"

                    }, {
                        status: 200
                    })

                } catch {

                    return NextResponse.json({

                        success: false,
                        message: error.response?.data.message

                    }, {
                        status: error.response?.status
                    })

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
            message: "Try again in a few minutes"

        }, {
            status: 500
        })
    }

}