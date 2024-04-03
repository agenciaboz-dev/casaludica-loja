export interface InstagramPost {
    inputUrl: string
    id: string
    type: "Video" | "Image"
    shortCode: string
    caption: string
    hashtags: string
    url: string
    commentsCount: number
    firstComment: string
    dimensionsHeight: number
    dimensionsWidth: number
    displayUrl: string
    images: string[]
    alt: string
    likesCount: number
    timestamp: string
    videoUrl?: string
}
