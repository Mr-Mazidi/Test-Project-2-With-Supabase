// "use client"

// import { Axios } from "@/app/api/Axios"
// import CreatePublicListProducts from "@/app/components/CreatePublicListProducts"
// import Loading from "@/app/loading"
// import { TypeParent, TypeRes } from "@/app/schema/TypeMy-purchases"
// import { useQuery } from "@tanstack/react-query"


// export default function Page() {


//     const { data, isPending, isError } = useQuery({

//         queryKey: ["My Purchases"],

//         queryFn: async () => {

//             return await Axios({

//                 url: "/api/my-purchases",
//                 method: "get"

//             })

//         }


//     })

//     //جواب api
//     //    Object { res: (2)[…], succes: true }
//     // res: Array[{… }, {… }]
//     // 0: Object { id: "a9b8e59f-bfc4-43b5-9f6d-2c404b1cd5a7", created_at: "2026-09-27T14:35:37.296359+00:00", status: "paid", … }
//     // created_at: "2026-09-27T14:35:37.296359+00:00"
//     // id: "a9b8e59f-bfc4-43b5-9f6d-2c404b1cd5a7"
//     // items: Array[{… }]
//     // 0: Object { id: 17, name: "Chocolate", image: "https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/public/products/Shokolat.webp", … }
//     // category: "Electronics"
//     // created_at: "2026-09-22T12:19:09.979256+00:00"
//     //     description: "Proin vitae facilisis nibh. Nulla facilisi. Mauris massa massa, eleifend id sapien ut, convallis lobortis felis. Nulla ullamcorper arcu orci, eu faucibus sapien placerat eget. Aliquam vel leo ut metus dignissim luctus eu eget ante. Donec pellentesque sapien commodo justo sagittis volutpat vel ut odio. Nullam diam risus, posuere varius mattis vitae, ullamcorper eget leo. Vestibulum ultrices in mi in faucibus. Ut aliquam vestibulum convallis. Aenean hendrerit felis luctus, rutrum felis id, rutrum nisl. Aenean in lacus at dolor rutrum accumsan blandit nec massa. Nunc egestas ut orci pretium pharetra. Quisque justo felis, finibus laoreet est euismod, commodo blandit nisi. Nullam vitae quam in diam faucibus ultrices sed eget sem. Donec scelerisque dignissim augue, non dapibus ligula imperdiet et. Nulla nibh sem, cursus ac posuere in, dignissim a lacus. "
//     // id: 17
//     //     image: "https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/public/products/Shokolat.webp"
//     //     name: "Chocolate"
//     // price: 2
//     // quantity: 1
//     // status: true
//     // user_id: "eaad25d0-eec1-4fb9-b7d1-4a87d07692c6"
//     // length: 1
//     // status: "paid"
//     //  total_price: 2
//     // 1: Object { id: "d74353e3-08f5-4b5d-99a2-03966ead8868", created_at: "2026-09-27T14:34:18.629219+00:00", status: "paid", … }
//     // length: 2
//     // succes: true


//     if (isPending) return <Loading />
//     if (isError) return <p>Error ...</p>

//     const Data: TypeParent = data

//     if (!Data.succes) return <div className="
//     pt-20 px-10
//     w-full min-h-screen 
//     flex flex-col justify-center items-center 
//     text-red-600 md:text-2xl text-center font-bold
//     ">

//         {

//             Data.message ?

//                 <p>{Data.message}</p>

//                 :

//                 <p>There was a problem</p>

//         }

//         <p>Try again later</p>
//     </div>

//     const res: TypeRes = Data.res


//     return (

//         <div className="py-32">

//             {

//                 res.map((valueRes) => {

//                     return (
//                         <div className="w-full h-full pt-10" key={valueRes.id}>{

//                             <div className="w-full h-full flex justify-center">

//                                 <div className="grid justify-center items-center w-auto
//                                             grid-cols-1 md:grid-cols-2 xl:grid-cols-3
//                                             px-3 gap-3
//                                         ">{

//                                         valueRes.items.map((product) => {

//                                             return (

//                                                 <div className="w-[300px] xl:w-sm" key={product.id}>

//                                                     <CreatePublicListProducts
//                                                         id={product.id}
//                                                         image={product.image}
//                                                         name={product.name}
//                                                         price={product.price}
//                                                         quantity={product.quantity}
//                                                         status={product.status}
//                                                     />

//                                                 </div>

//                                             )

//                                         })

//                                     }</div>

//                             </div>

//                         }</div>
//                     )

//                 })

//             }


//         </div>

//     )
// }


"use client";

import { Axios } from "@/app/api/Axios";
import CreatePublicListProducts from "@/app/components/CreatePublicListProducts";
import Loading from "@/app/loading";
import { TypeParent, TypeRes } from "@/app/schema/TypeMy-purchases";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
    const { data, isPending, isError } = useQuery({
        queryKey: ["my-purchases"],
        queryFn: async () => {
            return await Axios({
                url: "/api/my-purchases",
                method: "get",
            });
        },
    });

    if (isPending) return <Loading />;

    if (isError) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 pt-32">
                <section className="mx-auto flex min-h-80 max-w-xl animate-[fadeInUp_600ms_ease_both] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div className="mb-4 grid size-14 place-items-center rounded-full bg-rose-50 text-2xl font-bold text-rose-600">
                        !
                    </div>

                    <h2 className="text-xl font-extrabold text-slate-800">
                        Something went wrong
                    </h2>

                    <p className="mt-3 text-slate-500">
                        We could not load your purchases.
                    </p>

                    <p className="mt-1 text-slate-500">
                        Please try again later.
                    </p>
                </section>
            </main>
        );
    }

    const Data: TypeParent = data;

    if (!Data.succes) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 pt-32">
                <section className="mx-auto flex min-h-80 max-w-xl animate-[fadeInUp_600ms_ease_both] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div className="mb-4 grid size-14 place-items-center rounded-full bg-rose-50 text-2xl font-bold text-rose-600">
                        !
                    </div>

                    <h2 className="text-xl font-extrabold text-slate-800">
                        Unable to load purchases
                    </h2>

                    <p className="mt-3 text-slate-500">
                        {Data.message || "There was a problem."}
                    </p>

                    <p className="mt-1 text-slate-500">
                        Please try again later.
                    </p>
                </section>
            </main>
        );
    }

    const res: TypeRes = Data.res;


    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,#eef2ff_0%,transparent_45%),#f8fafc] px-4 pb-20 pt-32 text-slate-800 sm:px-6">

            <div className="mx-auto w-full max-w-6xl">

                {/* Header */}
                <header className="mb-9 flex animate-[fadeInUp_650ms_ease_both] items-end justify-between gap-5">
                    <div>
                        <span className="mb-2 inline-block text-xs font-extrabold tracking-[0.16em] text-indigo-600">
                            YOUR ACCOUNT
                        </span>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                            My Purchases
                        </h1>

                        <p className="mt-3 text-sm text-slate-500 sm:text-base">
                            All your orders, together in one place.
                        </p>
                    </div>

                    <div className="flex min-w-20 flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white/80 px-5 py-4 shadow-sm">
                        <span className="text-3xl font-extrabold text-indigo-600">
                            {res.length}
                        </span>

                        <span className="text-xs font-semibold text-slate-500">
                            {res.length === 1 ? "Order" : "Orders"}
                        </span>
                    </div>
                </header>

                {/* Empty state */}
                {res.length === 0 ? (
                    <section className="flex min-h-80 animate-[fadeInUp_600ms_ease_both] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
                        <div className="mb-5 grid size-20 place-items-center rounded-3xl bg-indigo-50 text-4xl">
                            🛍️
                        </div>

                        <h2 className="text-2xl font-extrabold text-slate-800">
                            No purchases yet
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
                            Your orders will appear here after you complete a
                            purchase.
                        </p>
                    </section>
                ) : (
                    <div className="flex flex-col gap-7">
                        {res.map((valueRes, index) => (
                            <article
                                key={valueRes.id}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                                className="animate-[fadeInUp_600ms_ease_both] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(30,41,59,0.045)] transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_20px_45px_rgba(79,70,229,0.10)]"
                            >
                                {/* Order header */}
                                <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-linear-to-r from-white to-indigo-50/30 px-5 py-6 sm:px-7">
                                    <div className="min-w-0">
                                        <span className="text-[10px] font-extrabold tracking-[0.15em] text-slate-400">
                                            ORDER
                                        </span>

                                        <h2 className="mt-1 break-all text-sm font-bold text-slate-800 sm:text-base">
                                            #{valueRes.id}
                                        </h2>

                                        <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                                            {new Date(
                                                valueRes.created_at
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>

                                    <span
                                        className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-bold capitalize ${valueRes.status === "paid"
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-orange-50 text-orange-700"
                                            }`}
                                    >
                                        <span className="size-2 rounded-full bg-current" />
                                        {valueRes.status}
                                    </span>
                                </div>

                                {/* Products */}
                                <div className="flex justify-start items-center gap-5 p-4 sm:p-6 overflow-x-auto">
                                    {valueRes.items.map((product) => (
                                        <div
                                            key={product.id}
                                            className="min-w-[280px] md:min-w-auto animate-[productAppear_500ms_ease_both]"
                                        >
                                            <CreatePublicListProducts
                                                id={product.id}
                                                image={product.image}
                                                name={product.name}
                                                price={product.price}
                                                quantity={product.quantity}
                                                status={product.status}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Order total */}
                                <footer className="flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-7">
                                    <span className="text-sm font-semibold text-slate-500">
                                        Order total
                                    </span>

                                    <strong className="text-xl font-extrabold text-indigo-700 sm:text-2xl">
                                        ${Number(valueRes.total_price).toFixed(2)}
                                    </strong>
                                </footer>
                            </article>
                        ))}
                    </div>
                )}

            </div>


        </main >
    );
}