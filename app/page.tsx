"use client"
// محصولات حذف شده به طور خودکار با کمک سوپابیس و استفاده از corn محصولات که وضعیتشان false شده را حذف می کند

import Button from "./components/Button"
import { useRouter } from "next/navigation"
import Description from "./components/Description"
import { BadgeCheck, BriefcaseBusiness, Heart, ShoppingBag, Tag, Truck } from "lucide-react"
import { DeleteToken } from "./api/LoginCookies"




export default function Home() {

  const router = useRouter()
  return (
    <div className="w-full min-h-screen 
    pt-32 pb-20
    flex flex-col items-center 
    bgMain
    ">

      <div>

        <p className="font-bold text-2xl md:text-4xl text-center px-3.5">Welcome To Mobin Shop</p>

      </div>

      <div className="w-10/12 h-4 changeBackGround rounded-full mt-4 mb-7"></div>

      <div>

        <Button
          className="md:text-2xl"
          onClick={async () => {
            await DeleteToken()
            router.push("/auth/login")
          }}>Let`s Go</Button>

      </div>

      <div className="mt-10
      grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8
      ">

        <Description description="Over 32 Years of Experience">

          <BriefcaseBusiness size={36} color="#fff" strokeWidth={2} />

        </Description>


        <Description description="High Quality Products">

          <BadgeCheck size={36} color="#fff" strokeWidth={2} />

        </Description>


        <Description description="A Wide Variety of Products">

          <ShoppingBag size={36} color="#fff" strokeWidth={2} />

        </Description>


        <Description description="Customer Satisfaction">

          <Heart size={36} color="#fff" strokeWidth={2} />

        </Description>


        <Description description="Fast & Reliable Delivery">

          <Truck size={36} color="#fff" strokeWidth={2} />

        </Description>


        <Description description="Great Products, Fair Prices">

          <Tag size={36} color="#fff" strokeWidth={2} />

        </Description>


      </div>

    </div >
  );
}
