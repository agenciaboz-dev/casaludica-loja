import React, { useEffect, useState } from "react"
import { Carousel } from "react-responsive-carousel"
import { ReactComponent as InstagramIcon } from "../../../images/socials/instagram.svg"
import { ReactComponent as FacebookIcon } from "../../../images/socials/facebook.svg"
import { ReactComponent as YoutubeIcon } from "../../../images/socials/youtube.svg"
import { ReactComponent as WhatsappIcon } from "../../../images/socials/whatsapp.svg"
import { ReactComponent as BackgroundImage } from "../../../images/background/socials.svg"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { api } from "../../../api"
import { InstagramPost } from "../../../types/server/instagram/post"
import { InstagramPostContainer } from "./InstagramPostContainer"
import { ButtonComponent } from "../../ButtonComponent"
import { useColors } from "../../../hooks/useColors"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../../../style/sliderStyle.css"

interface SocialProps {}

export const Social: React.FC<SocialProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const isTablet = useMediaQuery("(min-width: 450px) and (max-width: 999px)")

    const colors = useColors()

    const [posts, setPosts] = useState<InstagramPost[]>([])

    const backgroundStyle = {
        position: "absolute",
    }

    const links = {
        instagram: "https://www.instagram.com/casaludica/",
        whatsapp: "https://api.whatsapp.com/send?phone=554796179411&text=Ol%C3%A1,%20Casa%20L%C3%BAdica!",
        facebook: "https://www.facebook.com/casaludica.com.br",
        youtube: "https://www.youtube.com/@casaludica6482",
    }

    const getPosts = async () => {
        const response = await api.get("/instagram/scrape")
        const posts: InstagramPost[] = response.data
        setPosts(posts)
    }

    useEffect(() => {
        getPosts()
    }, [])

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "ease-in-out",
        variableWidth: true,
        arrows: true,
        pauseOnHover: false,
    }

    const socialIconsStyle = {
        width: isMobile ? "15vw" : "4vw",
        height: isMobile ? "15vw" : "4vw",
        backgroundColor: "#fff",
        aspectRatio: 1,
        borderRadius: "50%",
        border: `2px solid ${colors.primary}`,
    }

    return (
        <Box
            className="Social-Component"
            style={{
                position: "relative",
                flexDirection: "column",
                width: "100%",
                gap: "1vw",
                color: isTablet ? colors.primary : "white",
                margin: isMobile ? "10vw 0" : "2vw 0",
            }}
        >
            {!isTablet && (
                <BackgroundImage
                    className="background"
                    style={{
                        position: "absolute",
                        top: isMobile ? "-10vw" : "-1vw",
                        left: isMobile ? "-5vw" : "-15vw",
                        zIndex: "-1",
                        height: isMobile ? "145vw" : "34vw",
                        transform: isMobile ? "scale(1,1.1)" : "scale(3,1)",
                        width: "100vw",
                    }}
                />
            )}
            <Box className="follow-us" sx={{ flexDirection: "column", pt: "1vw" }}>
                <h3
                    style={{
                        fontSize: isMobile ? "5vw" : "1.5rem",
                    }}
                >
                    Nos siga em
                </h3>
                <h3
                    className="ig-at"
                    style={{
                        fontSize: isMobile ? "6vw" : "2rem",
                        fontFamily: "Poppins",
                    }}
                >
                    @casaludica
                </h3>
            </Box>

            <Box
                sx={{
                    justifyContent: "center",
                }}
            >
                {/* {posts.length && (
                    <Carousel
                        showThumbs={false}
                        autoPlay
                        infiniteLoop
                        interval={5000}
                        transitionTime={1000}
                        showStatus={false}
                        centerMode={true}
                        centerSlidePercentage={isMobile ? 80 : 17}
                        width={"100vw"}
                    >
                        {posts.map((post) => (
                            <InstagramPostContainer key={post.id} post={post} />
                        ))}
                    </Carousel>
                )} */}

                {posts.length && (
                    <Box
                        sx={{
                            width: "100vw",
                        }}
                    >
                        <Slider {...sliderSettings}>
                            {posts.map((post) => (
                                <InstagramPostContainer key={post.id} post={post} />
                            ))}
                        </Slider>
                    </Box>
                )}
            </Box>

            <Box
                className="icons-container"
                style={{
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <IconButton onClick={() => window.open(links.instagram, "_blank")?.focus()}>
                    <InstagramIcon style={socialIconsStyle} />
                </IconButton>
                <IconButton onClick={() => window.open(links.facebook, "_blank")?.focus()}>
                    <FacebookIcon style={socialIconsStyle} />
                </IconButton>
                <IconButton onClick={() => window.open(links.youtube, "_blank")?.focus()}>
                    <YoutubeIcon style={socialIconsStyle} />
                </IconButton>
                <IconButton onClick={() => window.open(links.whatsapp, "_blank")?.focus()}>
                    <WhatsappIcon style={socialIconsStyle} />
                </IconButton>
            </Box>
        </Box>
    )
}
