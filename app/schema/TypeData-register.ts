import { z } from "zod"


export const DataRegisterSchema = z.object({

    email: z.email({ error: "This email invalid" }),
    password: z.string().length(6, { error: "The password length is must 6 character" }),

})

export const OTPCodeRegister = z.string().length(6, { error: "The password length is must 6 character" }).refine((vlaue) => {
    return Number(vlaue)
}, { error: "This code is invalid" })

