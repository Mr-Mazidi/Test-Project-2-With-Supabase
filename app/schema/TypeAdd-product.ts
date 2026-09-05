import { z } from "zod"

export const schema = z.object({

    photo: z.string(),
    title: z.string().min(3, { error: "The title be must more than three characters." }),

    price: z.string().refine((value) => {
        return Number(value)
    }, { error: "The price in invalid." }).refine((vlaue) => {
        return Number(vlaue) > 0.01
    }, { error: "The price be must more than 0.01 dalor." }
    ),

    description: z.string().min(30, { error: "The title be must more than 30 characters." }),

})
