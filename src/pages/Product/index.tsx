import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
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
import useMeasure from "react-use-measure"
import { SimilarProduct } from "../Results/SimilarProduct"
import { useDraggable } from "react-use-draggable-scroll"
import "../../style/carouselStyle.css"
import ImageIcon from "@mui/icons-material/Image"

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
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box
            sx={{
                gap: "5vw",
                fontSize: isMobile ? "1.1rem" : "2rem",
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
    const [descriptionRef, { height }] = useMeasure()
    const initialDescriptionHeight = isMobile ? "30vw" : "20vw"
    // const current_id_ref = useRef(0)
    const max_height = useRef(height)
    const scrollRef = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(scrollRef, { applyRubberBandEffect: true })

    const [product, setProduct] = useState<Product>()
    const [category, setCategory] = useState<Category>()
    const [galery, setGalery] = useState<string[]>([])
    const [quantity, setQuantity] = useState(1)
    const [descriptionHeight, setDescriptionHeight] = useState<number | string>(0)
    const similarProducts = products.filter((item) => item.category == product?.category && item.id != product?.id)
    const fullDescription = descriptionHeight == max_height.current

    const onDescriptionClick = () => {
        setDescriptionHeight((height) => (fullDescription ? initialDescriptionHeight : max_height.current))
    }

    const onCategoryClick = () => {
        navigate(`/search/category/${category?.id}`)
    }

    const changeQuantity = (value: number) => {
        if (value == -1 && quantity == 1) return

        setQuantity(quantity + value)
    }

    // useLayoutEffect(() => {
    //     console.log({ height })
    //     setDescriptionHeight(initialDescriptionHeight)
    // }, [])

    useEffect(() => {
        if (height > 0 && !max_height.current) {
            max_height.current = height
            setDescriptionHeight(initialDescriptionHeight)
        }
    }, [height])

    // useEffect(() => {
    //     if (current_id_ref.current != id && height > 0 && !max_height.current && height > window.screen.width * 0.2) {
    //         max_height.current = height
    //         current_id_ref.current = id
    //         setDescriptionHeight(initialDescriptionHeight)
    //     }
    // }, [height, id])

    // useEffect(() => {
    //     if (current_id_ref.current != id && height > 0 && !max_height.current && height > window.screen.width * 0.2) {
    //         max_height.current = height

    //         current_id_ref.current = id

    //         setDescriptionHeight(max_height.current)
    //     } else if (current_id_ref.current == id && height > max_height.current) {
    //         setDescriptionHeight(max_height.current)
    //     }
    // }, [height, id])

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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

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
                            padding: isMobile ? "3vw 5vw" : "1vw",
                            flexDirection: "column",
                            width: "100%",
                            gap: "1vw",
                        }}
                    >
                        <Box sx={{ flex: 1, justifyContent: "space-between", gap: "2vw" }}>
                            <Box sx={{ flex: isMobile ? 0.7 : 0.9 }}>
                                <DataText
                                    title="Marca:"
                                    value={`${product.brand}`}
                                    titleSx={{
                                        fontSize: isMobile ? "0.9rem" : "1.2rem",
                                        justifyContent: "flex-start",
                                        gap: isMobile ? "2vw" : "1vw",
                                    }}
                                    valueSx={{ fontSize: isMobile ? "0.8rem" : "1.2rem" }}
                                />
                            </Box>
                            <Box sx={{ gap: "1vw", flex: isMobile ? 0.3 : 0.1, alignItems: "center", fontSize: isMobile ? "0.8rem" : "1.2rem" }}>
                                <Rating
                                    value={product.rating}
                                    sx={{
                                        fontSize: "1.5rem",
                                        "& .MuiRating-iconFilled": {
                                            color: "primary.main",
                                        },
                                        "& .MuiRating-iconHover": {
                                            color: "primary.main",
                                        },
                                    }}
                                />
                                {product.rating}
                            </Box>
                        </Box>
                        <h3 style={{ fontSize: isMobile ? "1.2rem" : "2vw" }}>{product.name}</h3>
                    </Paper>

                    <Box flexDirection={isMobile ? "column" : "row"} gap={isMobile ? "4vw" : "2vw"}>
                        <Paper
                            className="galery"
                            sx={{
                                flexDirection: isMobile ? "" : "column",
                                width: isMobile ? "100%" : "50%",
                                flex: 1,
                            }}
                        >
                            {!!galery.length ? (
                                <Carousel
                                    showThumbs={false}
                                    autoPlay
                                    autoFocus={true}
                                    infiniteLoop
                                    interval={5000}
                                    transitionTime={1000}
                                    showStatus={false}
                                >
                                    {galery.map((image, index) => (
                                        <Box key={index}>
                                            <img
                                                src={"data:image/jpeg;base64," + image}
                                                alt=""
                                                style={{
                                                    height: isMobile ? "" : "95%",
                                                    width: isMobile ? "" : "95%",
                                                    margin: "0 auto",
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Carousel>
                            ) : (
                                // <Skeleton
                                //     variant="rounded"
                                //     animation="wave"
                                //     sx={{ width: isMobile ? "90vw" : "37vw", height: isMobile ? "90vw" : "37vw", margin: "0 auto" }}
                                // />
                                <ImageIcon color="disabled" sx={{ width: "auto", height: "auto" }} />
                            )}
                        </Paper>
                        <Box width={isMobile ? "100%" : "50%"} flexDirection={"column"} gap={isMobile ? "4vw" : "2vw"} flex={1}>
                            <Box
                                sx={{
                                    flexDirection: "column",
                                    gap: isMobile ? "4vw" : "1vw",
                                    width: "100%",
                                    order: isMobile ? 1 : 2,
                                }}
                            >
                                <Box
                                    className="numbers"
                                    sx={{
                                        justifyContent: isMobile ? "space-between" : "center",
                                    }}
                                >
                                    <Box
                                        className="quantity-container"
                                        sx={{
                                            alignItems: "center",
                                            gap: isMobile ? "1vw" : "0.5vw",
                                            display: product?.stock == 0 ? "none" : "",
                                            width: "fit-content",
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
                                                fontSize: isMobile ? "5vw" : "1.5rem",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: isMobile ? "2vw 3vw" : "0 1vw",
                                                backgroundColor: colors.background_secondary,
                                                border: `1px solid ${colors.primary}`,
                                                borderRadius: "1vw",
                                                width: isMobile ? "12vw" : "4vw",
                                            }}
                                        >
                                            <p>{quantity}</p>
                                        </Box>

                                        <IconButton
                                            onClick={() => changeQuantity(1)}
                                            sx={{ padding: 0 }}
                                            disabled={quantity + 1 > (product.stock ? product.stock : 0)}
                                        >
                                            <ArrowIcon style={{ transform: "rotate(180deg)" }} />
                                        </IconButton>
                                    </Box>
                                    <CurrencyText
                                        value={product.price * quantity}
                                        style={{
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
                                            marginLeft: "1vw",
                                            width: product?.stock == 0 ? "100%" : "",
                                        }}
                                    />
                                </Box>
                                <ButtonComponent onClick={() => cart.add({ ...product, quantity })} disabled={product.stock == 0}>
                                    {product?.stock == 0 ? "Indisponível" : "Adicionar ao carrinho"}
                                </ButtonComponent>
                            </Box>

                            <Box sx={{ flexDirection: "column", width: "100%", gap: "5vw", order: isMobile ? 2 : 1 }}>
                                <Box
                                    sx={{
                                        flexDirection: "column",
                                        color: "primary.main",
                                        height: descriptionHeight || "auto",
                                        overflow: "hidden",
                                        transition: "all 0.3s ease-in-out",
                                    }}
                                    ref={descriptionRef}
                                    onClick={onDescriptionClick}
                                >
                                    <DataText title="Descrição" value="" />
                                    <pre style={{ textAlign: "start", whiteSpace: "break-spaces" }}>{product.description}</pre>
                                </Box>

                                {/* {!!max_height.current && ( */}
                                {
                                    <Button sx={{ padding: 0 }} onClick={onDescriptionClick}>
                                        <Paper
                                            sx={{
                                                width: isMobile ? "100%" : "fit-content",
                                                padding: isMobile ? "3vw" : "0.5vw 2vw",
                                                flexDirection: isMobile ? "column" : "row",
                                                alignItems: "center",
                                                gap: isMobile ? "" : "1vw",
                                            }}
                                        >
                                            <DataText
                                                title={fullDescription ? "Ler menos" : "Ler mais"}
                                                value=""
                                                titleSx={{
                                                    fontSize: isMobile ? "0.9rem" : "1.1rem",
                                                    justifyContent: "flex-start",
                                                    width: "auto",
                                                    gap: 0,
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    width: 0,
                                                    height: 0,
                                                    borderColor: "primary.main",
                                                    borderLeft: isMobile ? "2vw solid transparent" : "0.8vw solid transparent",
                                                    borderRight: isMobile ? "2vw solid transparent" : "0.8vw solid transparent",
                                                    borderTop: fullDescription ? (isMobile ? "3vw wsolid" : "") : "0.8vw solid",
                                                    borderBottom: fullDescription ? (isMobile ? "3vw solid" : "0.8vw solid") : "",
                                                }}
                                            />
                                        </Paper>
                                    </Button>
                                }

                                {/* <Box sx={{ flexDirection: "column", width: "100%" }}>
                                <DataText title="Largura" value={`${product.width} cm`} />
                                <DataText title="Altura" value={`${product.height} cm`} />
                                <DataText title="Comprimento" value={`${product.lenght} cm`} />
                                <DataText title="Peso" value={`${product.weight} kg`} />
                                <DataText title="Classificação" value={`${product.ageRating}`} />
                                </Box> */}
                            </Box>
                        </Box>
                    </Box>
                </>
            )}
            <Box color="primary.main" sx={{ fontSize: isMobile ? "" : "1.2rem" }}>
                <h3>Produtos similares ({similarProducts.length})</h3>
            </Box>
            <Box
                ref={scrollRef}
                {...events}
                sx={{
                    gap: isMobile ? "5vw" : "2vw",
                    width: "100vw",
                    overflowX: "auto",
                    marginLeft: isMobile ? "-5vw" : "-10vw",
                    padding: isMobile ? "0 5vw 5vw" : "0 10vw 5vw",
                    scrollbarWidth: "none",
                }}
            >
                {similarProducts
                    .sort((a, b) => a.id - b.id)
                    .map((item) => (
                        <SimilarProduct product={item} key={item.id} />
                    ))}
            </Box>
            <Footer />
        </Box>
    )
}
