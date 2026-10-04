

export type ProductsType = {
    user_id?: string,
    description?: string | null,
    id?: number,
    image: string | null,
    name: string,
    price: number,
    quantity: number,
    status?: boolean,
    category?: "Clothing"
    | "Shoes"
    | "Bags"
    | "Electronics"
    | "Books"
    | "Food"
    | "Fruits"
    | "Tools"
    | "Watches"
}; 