import { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { Axios } from "../Axios";
import { cookies } from "next/headers";

const key = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(request: Request) {

    const [cookieStore, { email, password, OTPCode }] = await Promise.all([

        cookies(),
        request.json()

    ])

    const codeEmail = cookieStore.get("email_code")?.value

    if (!codeEmail) {

        return NextResponse.json({

            message: "There is a problem for cookies",
            success: false,
        }, {
            status: 200
        })
    }

    if (codeEmail !== OTPCode) {

        return NextResponse.json({

            message: "This code is incorrect",
            success: false,

        }, {

            status: 200

        })

    }


    try {

        await Axios({

            url: "https://myvyvaldnehjhnveuohs.supabase.co/auth/v1/admin/users",
            method: "post",

            body: {

                email,
                password,
                email_confirm: true

            },

            headers: {

                apikey: `${key}`,
                Authorization: `Bearer ${key}`,

            }

        })

        cookieStore.delete("email_code")

        return NextResponse.json({

            message: "register",
            success: true

        }, {
            status: 200
        })

    } catch (error) {

        if (isAxiosError(error)) {

            return NextResponse.json({

                message: error.response?.data.message || "Please try again later",
                success: false

            }, {

                status: 200

            })
        }

        return NextResponse.json({

            message: "Please try again later",
            success: false

        }, {

            status: 200

        })

    }
}