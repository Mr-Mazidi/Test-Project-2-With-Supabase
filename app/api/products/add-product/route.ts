import { NextResponse } from "next/server"
import { GetUser } from "../../GetUser"
import { schema } from "@/app/schema/TypeAdd-product"
import { Axios } from "../../Axios"
import { isAxiosError } from "axios"
import { cookies } from "next/headers"
import { RefreshAccessToken } from "../../refreshAccessToken"



const key = process.env.NEXT_PUBLIC_KEY_SUPABASE

const serverSchema = schema.omit({
    image: true
})

export async function POST(request: Request) {
    const user = await GetUser()
    let urlImage = ""
    let fileName = ""

    if (!user.success) {
        return NextResponse.json({
            success: false,
            message: "error in get data user"
        }, {
            status: 500
        })
    }


    const formData = await request.formData()
    const image = formData.get("image")
    const name = formData.get("name")
    const price = formData.get("price")
    const quantity = formData.get("quantity")
    const description = formData.get("description")
    const category = formData.get("category")


    const result = serverSchema.safeParse({

        title: name,
        price,
        description,
        quantity,
        category

    })

    if (!(image instanceof File)) return NextResponse.json({
        success: false,
        message: "The Image is invalid"
    }, {
        status: 400
    })

    if (!result.success) {
        return NextResponse.json({
            success: false,
            message: "Data is invalid"
        }, {
            status: 400
        })
    }

    const data = result.data


    const cookieStore = await cookies()
    let accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {

        return NextResponse.json({
            success: false,
            message: "The access token is not found"
        }, {
            status: 500
        })

    }

    // Add Image To Storage
    try {
        fileName = `${crypto.randomUUID()}-${image.name}`
        const upload = await Axios({
            url: `https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/products/${fileName}`,
            method: "post",
            headers: {
                apikey: `${key}`,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": image.type,
            },
            body: image
        })
        urlImage = upload.Key

    } catch (error) {

        if (isAxiosError(error)) {

            if (error.response?.status === 401) {

                try {
                    accessToken = await RefreshAccessToken()


                    const upload = await Axios({
                        url: `https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/products/${fileName}`,
                        method: "post",
                        headers: {
                            apikey: `${key}`,
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": image.type,
                        },
                        body: image
                    })

                    urlImage = upload.Key

                } catch {

                    return NextResponse.json({

                        success: false,
                        message: "Try Again"

                    }, {
                        status: 500
                    })

                }

            } else {

                return NextResponse.json({
                    message: error.response?.data.message,
                    success: false
                }, {
                    status: error.response?.status
                })

            }

        } else {

            return NextResponse.json({

                success: false,
                message: "Try Again"

            }, {
                status: 500
            })

        }
    }

    // Add Product
    try {

        const res = await Axios({
            url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products",
            method: "post",
            headers: {
                apikey: `${key}`,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                Prefer: "return=representation"
            },
            body: {

                user_id: user.id,
                image: `https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/public/${urlImage}`,
                name: data.title,
                price: Number(data.price),
                quantity: Math.ceil(Number(data.quantity)),
                description: data.description,
                category: data.category,

            }
        })

        return NextResponse.json({
            message: "successfully",
            res: res
        }, {
            status: 200
        })

    } catch (error) {

        if (isAxiosError(error)) {

            if (error.response?.status === 401) {

                try {

                    accessToken = await RefreshAccessToken()

                    if (!accessToken) return NextResponse.json({
                        success: false,
                        message: "The access token is not found"
                    }, {
                        status: 500
                    })

                    cookieStore.set("access_token", accessToken)

                    const res = await Axios({
                        url: "https://myvyvaldnehjhnveuohs.supabase.co/rest/v1/products",
                        method: "post",
                        headers: {
                            apikey: `${key}`,
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                            Prefer: "return=representation"
                        },
                        body: {

                            user_id: user.id,
                            image: `https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/public/${urlImage}`,
                            name: data.title,
                            price: Number(data.price),
                            quantity: Math.ceil(Number(data.quantity)),
                            description: data.description,
                            category: data.category,

                        }
                    })

                    return NextResponse.json({
                        message: "successfully",
                        res: res
                    }, {
                        status: 200
                    })

                } catch {

                    await Axios({
                        url: `https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/products/${fileName}`,
                        method: "delete",
                        headers: {
                            apikey: `${key}`,
                            Authorization: `Bearer ${accessToken}`,
                        }
                    })

                    return NextResponse.json({

                        success: false,
                        message: "Try Again"

                    }, {
                        status: 500
                    })

                }
            }

            await Axios({
                url: `https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/products/${fileName}`,
                method: "delete",
                headers: {
                    apikey: `${key}`,
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            return NextResponse.json({
                message: error.response?.data.message
            }, {
                status: error.response?.status
            })

        }

        await Axios({
            url: `https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/products/${fileName}`,
            method: "delete",
            headers: {
                apikey: `${key}`,
                Authorization: `Bearer ${accessToken}`,
            }
        })

        return NextResponse.json({
            message: "Try Again"
        }, {
            status: 500
        })

    }

}