declare interface User {
    id: number
    name: string
    lastname: string
    cpf: string
    company: ?string
    postcode: string
    address: string
    number: string
    district: string
    complement: ?string
    city: string
    state: string
    phone: string
    email: string

    profilePicUrl: string

    orders: Order[]

    password?: string
}
