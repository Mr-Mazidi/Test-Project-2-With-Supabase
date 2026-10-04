import { z } from "zod"

export const schema = z.object({

    image: z.any().refine((files) => {
        return files.length > 0
    }, { error: "Select one Photo" }).transform((files) => files[0]),

    title: z.string().min(3, { error: "The title be must more than three characters." }),

    price: z.string().refine((value) => {
        return Number(value)
    }, { error: "The price in invalid." }).refine((vlaue) => {
        return Number(vlaue) > 0.01
    }, { error: "The price be must more than 0.01 dalor." }
    ),

    description: z.string().min(30, { error: "The description be must more than 30 characters." }),

    quantity: z.string().refine((value) => {
        return Number(value)
    }, { error: "The quantity in invalid." }).refine((vlaue) => {
        return Number(vlaue) >= 1
    }, { error: "The quantity be must more than 0 number." }
    ),

    category: z.enum([
        "Clothing",
        "Shoes",
        "Bags",
        "Electronics",
        "Books",
        "Food",
        "Fruits",
        "Tools",
        "Watches",
    ], { error: "Please select a valid category." })

})
