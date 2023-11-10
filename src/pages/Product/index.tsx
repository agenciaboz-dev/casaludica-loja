import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Background } from "../../components/Background"
import { Header } from "../../components/Header"
import { SearchField } from "../../components/SearchField"
import { useApi } from "../../hooks/useApi"
import { useCategories } from "../../hooks/useCategories"
import { useProducts } from "../../hooks/useProducts"
import { Skeleton, Paper, IconButton, Box, AlertColor } from "@mui/material"
//import "./style.scss"
import { Carousel } from "react-responsive-carousel"
import { CurrencyText } from "../../components/CurrencyText"
import { ReactComponent as ArrowIcon } from "../../images/arrow.svg"
import { useColors } from "../../hooks/useColors"
import Button from "@mui/material/Button"
import { useCart } from "../../hooks/useCart"
import { ButtonComponent } from "../../components/ButtonComponent"

interface ProductProps {}
interface DataTextProps {
    title: string
    value: React.ReactNode
    color?: AlertColor
    bold?: boolean
}

const DataText: React.FC<DataTextProps> = ({ title, value, color, bold }) => {
    return (
        <Box
            sx={{
                gap: "5vw",
                fontSize: "1.1rem",
                alignItems: "center",
                color: "primary.main",
                fontFamily: "BowlbyOneSC",
                justifyContent: "space-between",
                fontWeight: bold ? "bold" : "",
                width: "100%",
            }}
        >
            {title}
            <Box sx={{ textAlign: "flex-end", fontSize: "1rem", color: `${color}.main`, fontWeight: bold ? "bold" : "" }}>{value}</Box>
        </Box>
    )
}
export const Product: React.FC<ProductProps> = ({}) => {
    const id = Number(useParams().id)
    const { products } = useProducts()
    const { categories } = useCategories()
    const api = useApi()
    const navigate = useNavigate()
    const colors = useColors()
    const cart = useCart()

    const [product, setProduct] = useState<Product>({} as Product)
    const [category, setCategory] = useState<Category>()
    const [galery, setGalery] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [fullDescription, setFullDescription] = useState(false)

    const onCategoryClick = () => {
        navigate(`/search/category/${category?.id}`)
    }

    const changeQuantity = (value: number) => {
        if (value == -1 && quantity == 1) return

        setQuantity(quantity + value)
    }

    useEffect(() => {
        if (product.id) {
            setCategory(product?.categories)
            setLoading(false)
            api.images(product.id).then((images) => {
                const imagesList = images.split(",")
                console.log(imagesList)
                setGalery(imagesList)
            })
        }
    }, [product])

    useEffect(() => {
        if (products.length == 0) {
            api.products.id({
                data: { id },
                callback: (response: { data: Product }) => {
                    setProduct(response.data)
                },
            })
        } else {
            setProduct(products.filter((product) => product.id == id)[0])
        }
    }, [])
    return (
        <Box
            className="Product-Page"
            sx={{
                width: "100%",
                flexDirection: "column",
                gap: "5vw",
                padding: "0 5vw",
                paddingBottom: "10vw",
            }}
        >
            <Background />
            <Header />
            <SearchField />

            {loading ? (
                <>
                    <Skeleton variant="rounded" sx={{ width: "100%", height: "10vw" }} animation="wave" />
                </>
            ) : (
                <>
                    <Box className="navigation" sx={{ gap: "2vw", color: "white" }}>
                        <h3 className="link" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                            Início
                        </h3>
                        <h3>/</h3>
                        <h3 className="link" style={{ cursor: "pointer" }} onClick={() => onCategoryClick()}>
                            {category?.name}
                        </h3>
                        <h3>/</h3>
                        <h3 className="link">{product?.name}</h3>
                    </Box>

                    <Paper elevation={1} className="title" sx={{ padding: "3vw 5vw" }}>
                        <h3>{product.name}</h3>
                    </Paper>

                    <Paper className="galery">
                        {!!galery.length ? (
                            <Carousel showThumbs={false} autoPlay infiniteLoop interval={5000} transitionTime={1000}>
                                {galery.map((image, index) => (
                                    <Box key={index}>
                                        <img src={"data:image/jpeg;base64," + image} alt="" />
                                    </Box>
                                ))}
                            </Carousel>
                        ) : (
                            <Skeleton variant="rounded" animation="wave" sx={{ width: "90vw", height: "90vw" }} />
                        )}
                    </Paper>
                    <Box sx={{ flexDirection: "column", width: "100%" }}>
                        <Box
                            sx={{
                                flexDirection: "column",
                                color: "primary.main",
                                height: fullDescription ? "auto" : "30vw",
                                overflow: "hidden",
                            }}
                            onClick={() => setFullDescription(!fullDescription)}
                        >
                            <DataText title="Desrição" value="" />
                            <p style={{ textAlign: "justify" }}>{product.description}</p>
                        </Box>

                        <Button sx={{ fontSize: "1.1rem" }} onClick={() => setFullDescription(!fullDescription)}>
                            {fullDescription ? "encurtar" : "Ver tudo"}
                        </Button>

                        <Box sx={{ flexDirection: "column", width: "100%" }}>
                            <DataText title="Largura" value={`${product.width} cm`} />
                            <DataText title="Altura" value={`${product.height} cm`} />
                            <DataText title="Comprimento" value={`${product.lenght} cm`} />
                            <DataText title="Peso" value={`${product.weight} kg`} />
                            <DataText title="Classificação" value={`anos`} />
                        </Box>
                    </Box>

                    <Box className="numbers">
                        <Box className="quantity-container" sx={{ alignItems: "center", width: "50vw", justifyContent: "space-between" }}>
                            <IconButton onClick={() => changeQuantity(-1)}>
                                <ArrowIcon />
                            </IconButton>

                            <Box
                                className="quantity"
                                sx={{
                                    color: colors.primary,
                                    fontWeight: "bold",
                                    fontSize: "5vw",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: " 2vw 3vw",
                                    backgroundColor: colors.background_secondary,
                                    border: `1px solid ${colors.primary}`,
                                    borderRadius: "1vw",
                                }}
                            >
                                <p>{quantity}</p>
                            </Box>

                            <IconButton onClick={() => changeQuantity(1)}>
                                <ArrowIcon style={{ transform: "rotate(180deg)" }} />
                            </IconButton>
                        </Box>
                        <CurrencyText
                            value={product.price * quantity}
                            style={{
                                width: "50vw",
                                color: colors.primary,
                                display: "flex",
                                flexDirection: "row-reverse",
                                alignItems: "center",
                                fontSize: "8vw",
                                fontWeight: "bold",
                            }}
                        />
                    </Box>
                    <ButtonComponent onClick={() => cart.add({ ...product, quantity })}>Adicionar ao carrinho</ButtonComponent>
                </>
            )}
        </Box>
    )
}
