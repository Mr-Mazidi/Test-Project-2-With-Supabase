import { ComponentProps } from "react";


type SelectType = Omit<ComponentProps<"select">, "size"> & {

    size?: "sm" | "md" | "xl" | "not",
    className?: string
}

export default function Select({ size = "md", className = "", children = "", ...prop }: SelectType) {

    const Size = {
        sm: "w-3/6 px-3 py-1.5",
        md: "w-4/6 px-3 py-1.5",
        xl: "w-5/6 px-3 py-1.5",
        not: "",
    }



    return (
        <select
            className={`
                cursor-pointer

                flex justify-center items-center
                bg-blue-500
                gap-1
                rounded-md
                ${Size[size]}


                disabled:opacity-50
                disabled:cursor-not-allowed

                hover:ring-2
                hover:ring-black
                hover:ring-offset-2

                active:scale-95
                    
                    ${className}

            `}
            {...prop}
        > {children}</select >

    )
}