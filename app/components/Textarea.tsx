import { ComponentProps } from "react"


type TextareaType = ComponentProps<"textarea"> & {

    size?: "sm" | "md" | "xl" | "not",
    className?: string
}

export function Textarea({ size = "md", className = "", placeholder, ...prop }: TextareaType) {

    const Size = {
        sm: "w-3/6 p-2 h-20",
        md: "w-4/6 p-2 h-28",
        xl: "w-5/6 p-2 h-40",
        not: "",
    }

    return (
        <textarea

            className={`
                resize-none rounded-md border p-4
                flex justify-center items-center
                bg-blue-500
                gap-1
                ${Size[size]}
                shadow-gray-500 shadow-xs
                cursor-pointer

                disabled:opacity-50
                disabled:cursor-not-allowed

                hover:ring-2
                hover:ring-black
                hover:ring-offset-2

                active:scale-95
                

                ${className}

                `}

            placeholder={placeholder}

        />
    )
}