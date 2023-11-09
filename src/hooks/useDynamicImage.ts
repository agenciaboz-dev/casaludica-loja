import { useEffect, useRef } from "react"
import { useApi } from "./useApi"
import { useProducts } from "./useProducts"

export const useDynamicImage = (product: Product) => {
    const api = useApi()

    const { add: updateProduct } = useProducts()

    const productRef = useRef(null)

    const handleProductVisible = () => {
        api.images(product.id, true).then((image) => {
            updateProduct({ ...product, cover: image })
            product.cover = image
        })
    }

    useEffect(() => {
        if (!product.cover) {
            const observer = new IntersectionObserver(
                async (entries) => {
                    const [entry] = entries
                    if (entry.isIntersecting) {
                        // The product is now in the viewport, fetch the image
                        handleProductVisible()
                        observer.unobserve(entry.target) // Stop observing since image is fetched
                    }
                },
                {
                    root: null, // Use the viewport as the root
                    threshold: 0.1, // 10% of the product should be visible
                }
            )

            if (productRef.current) {
                observer.observe(productRef.current)
            }

            return () => {
                if (productRef.current) {
                    observer.unobserve(productRef.current)
                }
            }
        }
    }, [product, productRef])

    return productRef
}
