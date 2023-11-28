interface DefaultLink {
    id: number
    name: string
    location: string
    onClick: () => void
}

declare interface Link extends DefaultLink {
    sublinks?: Sublink[]
}

declare interface Sublink extends DefaultLink {}
