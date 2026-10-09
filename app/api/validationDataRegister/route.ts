
import { NextResponse } from "next/server"
import { Axios } from "../Axios"
import { isAxiosError } from "axios"
import { DataRegisterSchema } from "@/app/schema/TypeData-register"
import { cookies } from "next/headers"


const key = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(request: Request) {


    const [body, cookieStore] = await Promise.all([

        request.json(),
        cookies()

    ])


    const result = DataRegisterSchema.safeParse(body)
    if (!result.success) {

        return NextResponse.json({

            message: "The data is invalid",
            success: false

        }, {

            status: 400

        })

    }


    const email = result.data.email.toLowerCase()


    try {

        // Checking for existence in the database
        const isEmailInDatabase = await Axios({

            url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/rpc/check_email_exists",
            method: "post",

            body: {
                p_email: email,
            },

            headers: {
                apikey: `${key}`,
                Authorization: `Bearer ${key}`
            }

        })

        if (isEmailInDatabase) {

            return NextResponse.json({

                message: "A user with this email already exists.",
                success: false

            }, {

                status: 409

            })

        }

        const code = Math.floor(

            100000 + Math.random() * 900000

        ).toString()

        cookieStore.set("email_code", `${code}`, {

            httpOnly: true,
            maxAge: 60 * 2,
            path: "/",
            sameSite: "lax"

        })

        await Axios({

            url: "http://localhost:3000/api/send-code-to-email",
            method: "post",

            body: {

                email,
                code

            }
        })



        return NextResponse.json({

            success: true,
            message: "200"

        }, {
            status: 200
        })



    } catch (error) {
        console.log("in validation data register file:", error)

        if (isAxiosError(error)) {

            return NextResponse.json({

                message: error.response?.data.message || "Please try again later",
                success: false

            }, {

                status: error.response?.status || 500

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