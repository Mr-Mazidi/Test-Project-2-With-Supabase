"use server"

import { cookies } from "next/headers";
import { Axios } from "./Axios";
import { isAxiosError } from "axios";
import { RefreshAccessToken } from "./refreshAccessToken";

const key = process.env.NEXT_PUBLIC_KEY_SUPABASE

export async function GetUser() {

    const cookeiStor = await cookies()
    const accessToken = cookeiStor.get("access_token")?.value


    if (!accessToken) {
        console.log("Access token not found")
        return null
    }

    try {
        const res = await Axios({
            url: "https://myvyvaldnehjhnveuohs.supabase.co/auth/v1/user",
            method: "get",
            headers: {
                apikey: `${key}`,
                Authorization: `Bearer ${accessToken}`
            }
        })

        return res


    } catch (error) {

        if (isAxiosError(error)) {

            if (error?.response?.status === 403 || error?.response?.status === 401) {

                const newAccessToken = await RefreshAccessToken()

                const res = await Axios({
                    url: "https://myvyvaldnehjhnveuohs.supabase.co/auth/v1/user",
                    method: "get",

                    headers: {
                        apikey: `${key}`,
                        Authorization: `Bearer ${newAccessToken}`
                    }

                })

                return {
                    success: true,
                    message: "OK",
                    ...res
                }


            }
        }

        return {
            success: false,
            message: "Please try again"

        }
    }

}