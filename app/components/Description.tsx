"use client"

import clsx from "clsx"
import { ReactNode } from "react"
import { useInView } from "react-intersection-observer"

type DescriptionProps = {
    description: string
    children: ReactNode
}

export default function Description({
    description,
    children
}: DescriptionProps) {

    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true
    })

    return (
        <div ref={ref} className={clsx(`w-44 h-52 p-2 
            md:w-56 md:h-64 md:p-4 
            bg-blue-700/40  backdrop-blur-md 
            text-center rounded-xl
            shadow-md transition duration-700
            hover:-translate-y-1 hover:shadow-xl`, {

            "opacity-0": !inView,
            "-translate-y-3": !inView,

        })}>

            <div className="
                w-full h-full
                flex flex-col
                justify-center
                items-center
            ">

                <div className="
                    bg-blue-950
                    rounded-xl
                    w-16 h-16
                    md:w-24 md:h-24
                    flex
                    justify-center
                    items-center
                ">
                    {children}
                </div>

                <p className="mt-4 px-2 font-medium md:text-xl">
                    {description}
                </p>

            </div >

        </div >
    )
}