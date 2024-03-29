import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { usePromotions } from '../../../hooks/usePromotions';
import { ReactComponent as InstagramIcon } from '../../../images/socials/instagram.svg'
import { ReactComponent as FacebookIcon } from '../../../images/socials/facebook.svg'
import { ReactComponent as YoutubeIcon } from '../../../images/socials/youtube.svg'
import { ReactComponent as WhatsappIcon } from '../../../images/socials/whatsapp.svg'
import { ReactComponent as BackgroundImage } from '../../../images/background/socials.svg'
import { Box, useMediaQuery } from "@mui/material"

interface SocialProps {}

export const Social: React.FC<SocialProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const promotions = usePromotions()

    const backgroundStyle = {
        position: "absolute",
    }

    const links = {
        instagram: "https://www.instagram.com/casaludica/",
        whatsapp: "https://api.whatsapp.com/send?phone=5547991684299&text=Ol%C3%A1,%20Casa%20L%C3%BAdica!",
        facebook: "https://www.facebook.com/casaludica.com.br",
        youtube: "https://www.youtube.com/@casaludica6482",
    }

    return (
        <Box
            className="Social-Component"
            style={{
                position: "relative",
                flexDirection: "column",
                width: "100%",
                gap: "1vw",
                color: "white",
            }}
        >
            <BackgroundImage
                className="background"
                style={{
                    position: "absolute",
                    top: isMobile ? "-10vw" : "5vw",
                    left: isMobile ? "-5vw" : "-10vw",
                    zIndex: "-1",
                    height: isMobile ? "125vw" : "",
                    transform: isMobile ? "" : "scale(3,1.5)",
                    width: "100vw",
                }}
            />
            <Box
                className="follow-us"
                style={{
                    flexDirection: "column",
                }}
            >
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
                        marginLeft: isMobile ? "4vw" : 0,
                    }}
                >
                    @casaludica
                </h3>
            </Box>

            <Carousel showThumbs={false} autoPlay infiniteLoop interval={5000} transitionTime={1000} showStatus={false}>
                {promotions.map((promotion) => (
                    <Box key={promotion.id}>
                        <img src={promotion.image_url} alt="" />
                        <p className="legend">{promotion.subtitle}</p>
                    </Box>
                ))}
            </Carousel>

            <Box
                className="icons-container"
                style={{
                    width: "100%",
                    justifyContent: "center",
                    gap: "2vw",
                }}
            >
                <InstagramIcon style={{ width: isMobile ? "15vw" : "4vw" }} onClick={() => window.open(links.instagram, "_blank")?.focus()} />
                <FacebookIcon style={{ width: isMobile ? "15vw" : "4vw" }} onClick={() => window.open(links.facebook, "_blank")?.focus()} />
                <YoutubeIcon style={{ width: isMobile ? "15vw" : "4vw" }} onClick={() => window.open(links.youtube, "_blank")?.focus()} />
                <WhatsappIcon style={{ width: isMobile ? "15vw" : "4vw" }} onClick={() => window.open(links.whatsapp, "_blank")?.focus()} />
            </Box>
        </Box>
    )
}