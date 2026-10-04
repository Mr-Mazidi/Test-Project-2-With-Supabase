"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function ListNavBar({ iconHead, textHead, url }:
    {
        iconHead: React.ReactNode,
        textHead: string,
        url: string
    }
) {


    const active = usePathname()

    return (
        <Link href={url} className="
        active:translate-x-2
        transition-all duration-300
        ">

            <div className={clsx(`flex items-center 
        pl-3 py-1 
        border-l-[1.5px] border-gray-500
        group
        `, {
                "!border-blue-200 !pl-5": active === url
            })}>

                <div className="pr-1 group-hover:rotate-12 transition-all duration-700">
                    {iconHead}
                </div>

                <p className="md:text-xl">
                    {textHead}
                </p>

            </div >

        </Link >
    )
}