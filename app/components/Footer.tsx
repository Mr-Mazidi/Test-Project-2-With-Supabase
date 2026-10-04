import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";



export default function Footer() {

    const today = new Date().toLocaleDateString("en-US")

    return (

        <div className="pt-10 pb-16 w-full h-auto 
        bg-black **:text-white 
        flex flex-col justify-between items-center">


            {/* Aboute Shop */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 py-10 ">


                <div>


                    <p className="pb-3">

                        ABOUTE SHOP

                    </p>

                    <p className="w-[280px] text-center">

                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure quidem voluptas consequatur facere quibusdam
                        laudantium neque quas ipsum nisi animi asperiores, aspernatur ducimus ex tempore,
                        voluptate nobis aliquid reiciendis! Beatae.

                    </p>


                </div>


                <div>


                    <p className="pb-3">

                        CONTACT US

                    </p>

                    <div>

                        <div className="translate-x-4 gap-1 flex items-center">

                            <MapPin size={23} strokeWidth={1.75} />
                            <p className="select-all">Yazd,Amamshahr</p>

                        </div>

                        <div className="translate-x-4 gap-1 flex items-center py-2">

                            <Mail size={23} strokeWidth={1.75} />
                            <p className="select-all">Mr.Mazidi88@gmail.com</p>

                        </div>

                        <div className="translate-x-4 gap-1 flex items-center">

                            <Phone size={23} strokeWidth={1.75} />
                            <p className="select-all">0913 573 3509</p>

                        </div>



                    </div>


                </div>


                <div>


                    <p className="pb-3">

                        COUNTERY

                    </p>

                    <Image className="pl-7"
                        src={"/Image/map.png"}
                        alt="Photo map"

                        width={280}
                        height={280}
                    />


                </div>


            </div>


            <div className="w-11/12 rounded-3xl border-b-2 border-white">

                <p className="text-center mb-2">

                    {today}

                </p>

            </div>

        </div>

    )
}

// Object { success: true, message: "successfully", res: (1) […] }
// message: "successfully"
// res: Array [ {…} ]
// 0: Object { id: 30, image: "https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/public/products/5b524f70-f22f-45a6-b05e-8f10d921e584-b6a6f4a3-720f-4804-98f7-6f72c3a0e9d3.webp", name: "dfdac", … }
// description: "sAcXCsOJCIShcnI sHC Aznxzk:kzmlxNxcbjdabgguascNl:xjcISAJCINKCxlcHNsilcb kxhdCBxj<c"
// id: 30
// image: "https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/public/products/5b524f70-f22f-45a6-b05e-8f10d921e584-b6a6f4a3-720f-4804-98f7-6f72c3a0e9d3.webp"
// name: "dfdac"
// price: 854
// user_id: "540b9633-907a-482e-b41e-fd4039c04aa0"
{/* <prototype>: Object { … } */ }
{/* length: 1 */ }
{/* <prototype>: Array [] */ }
{/* success: true */ }
{/* <prototype>: Object { … */ }