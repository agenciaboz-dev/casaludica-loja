export interface Product {
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
    tags?: string
    weight?: number
    width?: number
    height?: number
    lenght?: number
}

export interface Promotion {
    id: number
    image_url: string
    subtitle: string
}

export interface Collection {
    id: number,
    name: string,
    icon: any
}