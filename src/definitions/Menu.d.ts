declare interface Link {
    id: number
    name: string
    location: string
    sublinks?: Sublink[]
}

declare interface Sublink {
    id: number
    name: string
    location: string
}
