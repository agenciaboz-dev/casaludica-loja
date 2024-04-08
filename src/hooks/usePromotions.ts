import { useMediaQuery } from "@mui/material"
import { Promotion } from "../definitions/products"

export const usePromotions = () => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const promotions: Promotion[] = [
        {
            id: 1,
            image_url: require(`../images/promotions/${isMobile ? "mobile" : "desktop"}/1.webp`),
            subtitle: "",
        },
        {
            id: 2,
            image_url: require(`../images/promotions/${isMobile ? "mobile" : "desktop"}/2.webp`),
            subtitle: "",
        },
        {
            id: 3,
            image_url: require(`../images/promotions/${isMobile ? "mobile" : "desktop"}/3.webp`),
            subtitle: "",
        },
    ]

    return promotions
}
