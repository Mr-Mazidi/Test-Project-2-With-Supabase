"use client"

import { CircleUserRound, List, LogIn, PackagePlus, ShoppingBag, ShoppingCart, UserRoundPlus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ListNavBar from "./ListNavBar";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";



export default function Header({ isLogin }: { isLogin: string }) {

    const router = useRouter()
    const active = usePathname()

    const [isShowList, setIsShowList] = useState<boolean>(false)

    return (

        <div className="**:text-blue-200 ">

            <div className="fixed top-0 left-0 z-50 box-border min-w-xs
        h-18 md:h-24 w-screen bg-blue-950 
        flex justify-between items-center
        p-2
        border-b-[1px] border-blue-200

        ">




                <div onClick={() => setIsShowList((prev) => !prev)}
                    className="relative cursor-pointer pl-3
                    flex justify-center items-center
                    ">


                    <X strokeWidth={1.75}

                        className={`
                            size-8 md:size-11 md:ml-3
                    absolute 
                    transition-all
                    duration-200

                    ${isShowList ?

                                "opacity-100 rotate-0" :
                                "opacity-0 rotate-90"

                            }
                    `}
                    />

                    <List strokeWidth={1.75}

                        className={`
                            size-8 md:size-11 md:ml-3
                    absolute 
                    transition-all
                    duration-200

                    ${isShowList ?

                                "opacity-0 -rotate-90" :
                                "opacity-100 rotate-0"

                            }

                    `}
                    />

                </div>



                {/* Imgae Icon */}

                <div onClick={() => {

                    router.push("/")

                }} className=" relative  w-14 h-14 md:w-[70px] md:h-[70px]  cursor-pointer">

                    <Image src={"/Image/Icon.png"} alt="Icon" fill />

                </div>


            </div>


            {/* List Navbar */}



            <div className={`

                    flex fixed left-0 z-50 
                    mt-18 md:mt-24
                    backdrop-blur-sm 
                    transition-all duration-300
                    w-full h-full
                    

                ${isShowList ? "opacity-100 pointer-events-auto translate-x-0 " : "opacity-0 pointer-events-none -translate-x-full"}

            `
            }>


                <div className={`
                  bg-blue-950 
                    h-full w-full max-w-80 
                    pt-4 pl-3 
                    flex flex-col justify-between 
                    border-r-[1px] border-blue-200

                    ${isShowList ? "translate-x-0 " : "-translate-x-full"}
                    
                    `}>

                    <div>

                        {!isLogin && <div className="pt-2 ">

                            <p className={clsx("pl-1 pb-1 md:text-xl", {
                                "text-gray-400!": !(active.startsWith("/auth")),
                                "text-blue-200 ": active.startsWith("/auth")

                            })}>Auth</p>

                            <div>

                                <ListNavBar url="/auth/login" iconHead={<LogIn strokeWidth={1.75} size={23} />} textHead="Login" />
                                <ListNavBar url="/auth/register" iconHead={<UserRoundPlus strokeWidth={1.75} size={23} />} textHead="Register" />

                            </div>

                        </div>}


                        <div className="pt-2">

                            <p className={clsx("pl-1 pb-1 md:text-xl", {
                                "text-gray-400!": !(active.startsWith("/shop/products")),
                                "text-blue-200!": active.startsWith("/shop/products")

                            })}>Products</p>

                            <div>

                                <ListNavBar url="/shop/products" iconHead={<ShoppingBag strokeWidth={1.75} size={23} />} textHead="List Products" />
                                <ListNavBar url="/shop/products/add-product" iconHead={<PackagePlus strokeWidth={1.75} size={23} />} textHead="Add Product" />

                            </div>

                        </div>

                        <div className="pt-2">

                            <p className={clsx("pl-1 pb-1 md:text-xl", {
                                "text-gray-400!": !(active.startsWith("/shop/my-card")),
                                "text-blue-200!": active.startsWith("/shop/my-card")

                            })}>Card</p>

                            <div>

                                <ListNavBar url="/shop/my-card" iconHead={<ShoppingCart strokeWidth={1.75} size={23} />} textHead="My Card" />

                            </div>

                        </div>

                    </div>


                    {/* Profile Icon */}
                    <div className="pt-2 mb-20 md:mb-28">

                        <Link href={"/profile"}>

                            <CircleUserRound strokeWidth={1.5} className={clsx("size-10 md:size-12 hover:scale-105", {
                                "text-gray-500!": active === "/profile",
                                "text-blue-200!": active === "/profile",
                            })} />

                        </Link>

                    </div>

                </div>

                <div onClick={() => setIsShowList(false)} className="w-full h-full">

                </div>

            </div>


        </div >
    )
}