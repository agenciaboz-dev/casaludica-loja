import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Background } from "../../components/Background"
import { Header } from "../../components/Header"
import { SearchField } from "../../components/SearchField"
import { useApi } from "../../hooks/useApi"
import { useCategories } from "../../hooks/useCategories"
import { useProducts } from "../../hooks/useProducts"
import { Skeleton, Paper, IconButton, Box, AlertColor, Rating, SxProps, useMediaQuery } from "@mui/material"
//import "./style.scss"
import { Carousel } from "react-responsive-carousel"
import { CurrencyText } from "../../components/CurrencyText"
import { ReactComponent as ArrowIcon } from "../../images/arrow.svg"
import { useColors } from "../../hooks/useColors"
import Button from "@mui/material/Button"
import { useCart } from "../../hooks/useCart"
import { ButtonComponent } from "../../components/ButtonComponent"
import { ProductContainer } from "../Results/ProductContainer"
import { Footer } from "../../components/Footer"

interface ProductProps {}
interface DataTextProps {
    title: string
    value: React.ReactNode
    color?: AlertColor
    bold?: boolean
    titleSx?: SxProps
    valueSx?: SxProps
}

const DataText: React.FC<DataTextProps> = ({ title, value, color, bold, valueSx, titleSx }) => {
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
                ...titleSx,
            }}
        >
            {title}
            <Box
                sx={{
                    fontSize: "1rem",
                    color: `${color}.main`,
                    fontWeight: bold ? "bold" : "",
                    ...valueSx,
                }}
            >
                {value}
            </Box>
        </Box>
    )
}
export const Product: React.FC<ProductProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const id = Number(useParams().id)
    const { products } = useProducts()
    const { categories } = useCategories()
    const api = useApi()
    const navigate = useNavigate()
    const colors = useColors()
    const cart = useCart()

    const [product, setProduct] = useState<Product>()
    const [category, setCategory] = useState<Category>()
    const [galery, setGalery] = useState<string[]>([])
    const [quantity, setQuantity] = useState(1)
    const [fullDescription, setFullDescription] = useState(false)

    const similarProducts = products.filter((item) => item.category == product?.category && item.id != product?.id)

    const onCategoryClick = () => {
        navigate(`/search/category/${category?.id}`)
    }

    const changeQuantity = (value: number) => {
        if (value == -1 && quantity == 1) return

        setQuantity(quantity + value)
    }

    useEffect(() => {
        if (product?.id) {
            setCategory(categories.find((category) => category.id == product.category))
            api.images(product.id).then((images) => {
                const imagesList = images.split(",")
                setGalery(imagesList)
            })
        }
    }, [product])

    useEffect(() => {
        if (products.length == 0) {
            api.products.id(id, {
                callback: (response: { data: Product }) => {
                    setProduct(response.data)
                },
            })
        } else {
            setProduct(products.find((product) => product.id == id))
        }
    }, [id])

    return (
        <Box
            className="Product-Page"
            sx={{
                width: "100%",
                flexDirection: "column",
                gap: isMobile ? "5vw" : "2vw",
                padding: isMobile ? "0 5vw" : "0 10vw",
                paddingBottom: isMobile ? "5vw" : 0,
            }}
        >
            <Background />
            <Header />
            {isMobile && <SearchField />}

            {!product ? (
                <>
                    <Skeleton variant="rounded" sx={{ width: "100%", height: "10vw" }} animation="wave" />
                    Buscando produto
                </>
            ) : (
                <>
                    <Box sx={{ gap: isMobile ? "2vw" : "1vw", color: "white", fontSize: "0.75rem" }}>
                        <h3 style={{ fontFamily: "Poppins", cursor: "pointer" }} onClick={() => navigate("/")}>
                            Início
                        </h3>
                        <h3 style={{ fontFamily: "Poppins" }}>/</h3>
                        <h3
                            style={{
                                fontFamily: "Poppins",
                                cursor: "pointer",
                                width: "auto",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                            onClick={() => onCategoryClick()}
                        >
                            {category?.name}
                        </h3>
                        <h3 style={{ fontFamily: "Poppins" }}>/</h3>
                        <h3
                            style={{
                                fontFamily: "Poppins",
                                width: "auto",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: isMobile ? "50vw" : "",
                            }}
                        >
                            {product?.name}
                        </h3>
                    </Box>

                    <Paper
                        elevation={1}
                        className="title"
                        sx={{
                            padding: isMobile ? "3vw 5vw" : "0.5vw",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: isMobile ? "" : "center",
                            gap: isMobile ? "1vw" : "0.5vw",
                        }}
                    >
                        <Box sx={{ width: "100%", justifyContent: isMobile ? "space-between" : "center", gap: "2vw" }}>
                            <Box sx={{ flex: isMobile ? 0.7 : "" }}>
                                <DataText
                                    title="Marca:"
                                    value={`${product.brand}`}
                                    titleSx={{ fontSize: "0.9rem", justifyContent: "flex-start", gap: isMobile ? "2vw" : "1vw" }}
                                    valueSx={{ fontSize: "0.8rem" }}
                                />
                            </Box>
                            <Box sx={{ gap: "1vw", flex: isMobile ? 0.3 : "", alignItems: "center", fontSize: "0.8rem" }}>
                                <Rating
                                    value={4}
                                    sx={{
                                        fontSize: "1rem",
                                        "& .MuiRating-iconFilled": {
                                            color: "primary.main",
                                        },
                                        "& .MuiRating-iconHover": {
                                            color: "primary.main",
                                        },
                                    }}
                                />
                                4.2
                            </Box>
                        </Box>
                        <h3 style={{ fontSize: "1.2rem" }}>{product.name}</h3>
                    </Paper>

                    <Paper
                        className="galery"
                        sx={{
                            flexDirection: isMobile ? "" : "column",
                        }}
                    >
                        {!!galery.length ? (
                            <Carousel showThumbs={false} autoPlay infiniteLoop interval={5000} transitionTime={1000} showStatus={false}>
                                {galery.map((image, index) => (
                                    <Box key={index}>
                                        <img
                                            src={"data:image/jpeg;base64," + image}
                                            alt=""
                                            style={{
                                                height: isMobile ? "" : "20vw",
                                                width: isMobile ? "" : "20vw",
                                                margin: "0 auto",
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Carousel>
                        ) : (
                            <Skeleton
                                variant="rounded"
                                animation="wave"
                                sx={{ width: isMobile ? "90vw" : "20vw", height: isMobile ? "90vw" : "20vw", margin: "0 auto" }}
                            />
                        )}
                    </Paper>

                    <Box
                        className="numbers"
                        sx={{
                            justifyContent: isMobile ? "space-between" : "center",
                            gap: isMobile ? "" : "2vw",
                        }}
                    >
                        <Box
                            className="quantity-container"
                            sx={{
                                alignItems: "center",
                                gap: "1vw",
                            }}
                        >
                            <IconButton onClick={() => changeQuantity(-1)} sx={{ padding: 0 }}>
                                <ArrowIcon />
                            </IconButton>

                            <Box
                                className="quantity"
                                sx={{
                                    color: colors.primary,
                                    fontWeight: "bold",
                                    fontSize: isMobile ? "5vw" : "2rem",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: isMobile ? "2vw 3vw" : "0 1vw",
                                    backgroundColor: colors.background_secondary,
                                    border: `1px solid ${colors.primary}`,
                                    borderRadius: "1vw",
                                    width: "12vw",
                                }}
                            >
                                <p>{quantity}</p>
                            </Box>

                            <IconButton onClick={() => changeQuantity(1)} sx={{ padding: 0 }}>
                                <ArrowIcon style={{ transform: "rotate(180deg)" }} />
                            </IconButton>
                        </Box>
                        <CurrencyText
                            value={product.price * quantity}
                            style={{
                                // width: isMobile ? "50vw" : "10vw",
                                color: colors.primary,
                                display: "flex",
                                flexDirection: "row-reverse",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: isMobile ? "8vw" : "1.5rem",
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                // overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        />
                    </Box>
                    <ButtonComponent onClick={() => cart.add({ ...product, quantity })} disabled={product.stock == 0}>
                        {product?.stock == 0 ? "Indisponível" : "Adicionar ao carrinho"}
                    </ButtonComponent>

                    <Box sx={{ flexDirection: "column", width: "100%", gap: "5vw" }}>
                        <Box
                            sx={{
                                flexDirection: "column",
                                color: "primary.main",
                                height: fullDescription ? "auto" : isMobile ? "30vw" : "auto",
                                overflow: "hidden",
                            }}
                            onClick={() => setFullDescription(!fullDescription)}
                        >
                            <DataText title="Descrição" value="" />
                            <pre style={{ textAlign: "start", whiteSpace: "break-spaces" }}>{product.description}</pre>
                        </Box>

                        {isMobile && (
                            <Button sx={{ padding: 0 }} onClick={() => setFullDescription(!fullDescription)}>
                                <Paper sx={{ width: "100%", padding: "3vw", flexDirection: "column", alignItems: "center" }}>
                                    <DataText
                                        title={fullDescription ? "Ler menos" : "Ler mais"}
                                        value=""
                                        titleSx={{ fontSize: "0.9rem", justifyContent: "flex-start", width: "auto", gap: 0 }}
                                    />
                                    <Box
                                        sx={{
                                            width: 0,
                                            height: 0,
                                            borderColor: "primary.main",
                                            borderLeft: "2vw solid transparent",
                                            borderRight: "2vw solid transparent",
                                            borderTop: fullDescription ? "" : "3vw solid",
                                            borderBottom: fullDescription ? "3vw solid" : "",
                                        }}
                                    />
                                </Paper>
                            </Button>
                        )}

                        {/* <Box sx={{ flexDirection: "column", width: "100%" }}>
                            <DataText title="Largura" value={`${product.width} cm`} />
                            <DataText title="Altura" value={`${product.height} cm`} />
                            <DataText title="Comprimento" value={`${product.lenght} cm`} />
                            <DataText title="Peso" value={`${product.weight} kg`} />
                            <DataText title="Classificação" value={`${product.ageRating}`} />
                        </Box> */}
                    </Box>

                    <Box color="primary.main">
                        <h3>Produtos similares ({similarProducts.length})</h3>
                    </Box>
                    <Box
                        sx={{
                            gap: "5vw",
                            width: "100vw",
                            overflowX: "auto",
                            marginLeft: isMobile ? "-5vw" : "-10vw",
                            padding: isMobile ? "0 5vw 5vw" : "0 10vw 5vw",
                        }}
                    >
                        {similarProducts
                            .sort((a, b) => a.id - b.id)
                            .map((item) => (
                                <Box sx={{ width: "90vw" }} key={item.id}>
                                    <ProductContainer product={item} />
                                </Box>
                            ))}
                    </Box>
                </>
            )}
            <Footer />
        </Box>
    )
}
