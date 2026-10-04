

export type TypeItems = {
    category: string,
    created_at: string,
    description: string,
    id: number,
    image: string,
    name: string,
    price: number,
    quantity: number,
    status: boolean,
    user_id: string,

}[]


export type TypeRes = {

    created_at: string,
    id: string,
    status: string,
    total_price: number,
    items: TypeItems

}[]


export type TypeParent = {

    res: TypeRes,

    succes: boolean,
    message?: string

}



//    Object { res: (2)[…], succes: true }
// res: Array[{… }, {… }]
// 0: Object { id: "a9b8e59f-bfc4-43b5-9f6d-2c404b1cd5a7", created_at: "2026-09-27T14:35:37.296359+00:00", status: "paid", … }
// created_at: "2026-09-27T14:35:37.296359+00:00"
// id: "a9b8e59f-bfc4-43b5-9f6d-2c404b1cd5a7"
// items: Array[{… }]
// 0: Object { id: 17, name: "Chocolate", image: "https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/public/products/Shokolat.webp", … }
// category: "Electronics"
// created_at: "2026-09-22T12:19:09.979256+00:00"
//     description: "Proin vitae facilisis nibh. Nulla facilisi. Mauris massa massa, eleifend id sapien ut, convallis lobortis felis. Nulla ullamcorper arcu orci, eu faucibus sapien placerat eget. Aliquam vel leo ut metus dignissim luctus eu eget ante. Donec pellentesque sapien commodo justo sagittis volutpat vel ut odio. Nullam diam risus, posuere varius mattis vitae, ullamcorper eget leo. Vestibulum ultrices in mi in faucibus. Ut aliquam vestibulum convallis. Aenean hendrerit felis luctus, rutrum felis id, rutrum nisl. Aenean in lacus at dolor rutrum accumsan blandit nec massa. Nunc egestas ut orci pretium pharetra. Quisque justo felis, finibus laoreet est euismod, commodo blandit nisi. Nullam vitae quam in diam faucibus ultrices sed eget sem. Donec scelerisque dignissim augue, non dapibus ligula imperdiet et. Nulla nibh sem, cursus ac posuere in, dignissim a lacus. "
// id: 17
//     image: "https://myvyvaldnehjhnveuohs.supabase.co/storage/v1/object/public/products/Shokolat.webp"
//     name: "Chocolate"
// price: 2
// quantity: 1
// status: true
// user_id: "eaad25d0-eec1-4fb9-b7d1-4a87d07692c6"
// length: 1
// status: "paid"
//  total_price: 2
// 1: Object { id: "d74353e3-08f5-4b5d-99a2-03966ead8868", created_at: "2026-09-27T14:34:18.629219+00:00", status: "paid", … }
// length: 2
// succes: true

