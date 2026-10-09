
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
    process.env.RESEND_KEY
)

export async function POST(request: NextRequest) {

    const { email, code } = await request.json()

    console.log(code)
    try {
        await resend.emails.send({

            from: "Mobin Online Shop <onboarding@resend.dev>",
            to: email,

            subject: "Mobin Online Shop",

            html: `

        <h1>Your verification code</h1>

        <h2>${code}</h2>
        
        <p>This code expires in 2 minutes

        `
        })

        return NextResponse.json({

            success: true,
            message: "send code to user email"

        }, {

            status: 200

        })
    } catch (error) {

        console.log("There is error in send code to email file:", error)

        return NextResponse.json({
            message: "Please try again later."
        }, {
            status: 500
        })

    }
}