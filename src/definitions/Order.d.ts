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

    user_id?: number

    products: OrderProduct[]
}

declare interface Charge {
    amount: {
        currency: string
        value: number
        summary: {
            total: number
            paid: number
            refunded: number
        }
    }

    created_at: string
    paid_at: string
    id: string
    payment_method: {
        type: string
    }
    reference_id: string
    status: string
}

declare interface Order {
    id: number
    storeId: number
    notes?: string
    datetime: string
    total: Float

    paymentType?: string
    installments?: number

    user: User

    products: OrderProduct[]
}

declare interface OrderProduct {
    name: string
    price: number
    quantity: number
    id: number
}