import { ComponentProps } from "react";


type OptionType = ComponentProps<"option"> & {

    className?: string
}

export default function Option({ value, className = "", children = "", ...prop }: OptionType) {



    return (
        <option


            value={value}
            className={`
                cursor-pointer

                flex justify-center items-center
                bg-blue-500
                gap-1
                rounded-md
                w-full
                my-2

                disabled:opacity-50
                disabled:cursor-not-allowed

                hover:ring-2
                hover:ring-black
                hover:ring-offset-2

                active:scale-95

                checked:bg-blue-700
                
                    ${className}

            `}
            {...prop}
        > {children}</option >

    )
}