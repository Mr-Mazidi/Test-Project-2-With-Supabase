import { Loader } from "lucide-react";



export default function Loading() {


    return (


        <div>

            <div className=" w-full min-h-screen bg-gray-500/40 blur-md"></div>

            <div className="fixed inset-0  flex justify-center items-center">

                <Loader size={50} className="Loading" />

            </div>


        </div>
    )
}