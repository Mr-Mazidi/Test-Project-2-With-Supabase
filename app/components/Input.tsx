import { ComponentProps } from "react"


type InputType = Omit<ComponentProps<"input">, "size"> & {
    size?: "sm" | "md" | "xl" | "not",
    className?: string
}

export default function Input({ size = "md", className = "", children = "", ...prop }: InputType) {

    const Size = {
        sm: "w-3/6 px-3 py-1.5",
        md: "w-4/6 px-3 py-1.5",
        xl: "w-5/6 px-3 py-1.5",
        not: "",
    }



    return (
        <div className={`

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


        `} >
            {children}
            <input
                className={`
                w-full
                cursor-pointer

                    
                    ${className}

            `}
                {...prop}
            />

        </div>
    )
}