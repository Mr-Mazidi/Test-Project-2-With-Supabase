import { cookies } from "next/headers";
import { Axios } from "./Axios";
import { setTokens } from "./LoginCookies";
import { redirect } from "next/navigation";


export async function RefreshAccessToken() {

    const key = process.env.NEXT_PUBLIC_KEY_SUPABASE
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get("refresh_token")?.value


    if (!refreshToken) redirect("/auth/login")


    const res = await Axios({

        url: "https://myvyvaldnehjhnveuohs.supabase.co/auth/v1/token?grant_type=refresh_token",
        method: "post",

        headers: {
            apikey: `${key}`
        },

        body: {
            refresh_token: refreshToken
        }

    })


    await setTokens({
        accessToken: res.access_token,
        refreshToken: res.refresh_token
    })


    return res.access_token

}