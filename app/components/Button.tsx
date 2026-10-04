import { ComponentProps } from "react"


type ButttonType = ComponentProps<"button"> & {
    size?: "sm" | "md" | "xl" | "not" | "button",
    className?: string,
    bg?: string,
}

export default function Button({ size = "md", bg = "", className = "", children, ...props }: ButttonType) {

    const Size = {
        sm: "px-2.5 py-1",
        md: "px-4.5 py-2",
        xl: "px-6.5 py-3",
        button: "w-10 h-10 flex justify-center items-center rounded-full",
        not: ""
    }

    return (

        <button className={`
       ${bg || "bg-blue-500"}
        cursor-pointer
        p-2
        rounded-md

        disabled:cursor-not-allowed
        disabled:opacity-50

        hover:ring-2
        hover:ring-black
        hover: ring-offset-2

        active:scale-95
            
        ${Size[size]}
        ${className}

`}
            {...props}
        >

            {children}

        </button>
    )
}