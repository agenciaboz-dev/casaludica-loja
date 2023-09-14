//import { Product } from "../pages/Product"

declare interface Product {
    id: number
    quantity: number
    name: string
    cover: string
    images?: string
    date?: Date
    description?: string
    resume?: string
    featured?: Boolean
    price: number
    stock?: number
    category?: number
    categories?: Category
    tags?: string
    weight?: number
    width?: number
    height?: number
    lenght?: number
}
