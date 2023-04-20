export interface Link {
    id: number
    name: string
    location: string
    sublinks?: Sublink[]
}

export interface Sublink {
    id: number
    name: string
    location: string
}