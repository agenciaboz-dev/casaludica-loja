declare interface OrderForm {
    address: string
    city: string
    email: string
    lastname: string
    name: string
    phone: string
    postcode: string
    storeId: number
    company: string
    notes: string
    total: number
    district: string
    complement?: string
    number: string
    state: string
    cpf: string

    products: {
        name: string
        price: number
        quantity: number
        id: number
    }[]
}
