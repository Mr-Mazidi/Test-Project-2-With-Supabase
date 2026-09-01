import axios from "axios";

type MethodType = "get" | "put" | "post" | "delete" | "patch"
export async function Axios({ url, method, body, headers }: {
    url: string,
    method: MethodType,
    body?: object | undefined,
    headers?: Record<string, string> | undefined,
}) {

    const res = await axios.request({
        url,
        method,
        data: body,
        headers,
    })

    return res.data
}