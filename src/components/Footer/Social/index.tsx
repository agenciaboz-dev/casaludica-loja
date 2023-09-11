import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { usePromotions } from '../../../hooks/usePromotions';
import { ReactComponent as InstagramIcon } from '../../../images/socials/instagram.svg'
import { ReactComponent as FacebookIcon } from '../../../images/socials/facebook.svg'
import { ReactComponent as YoutubeIcon } from '../../../images/socials/youtube.svg'
import { ReactComponent as WhatsappIcon } from '../../../images/socials/whatsapp.svg'
import { ReactComponent as BackgroundImage } from '../../../images/background/socials.svg'
import { Box } from '@mui/material';

interface SocialProps {
    
}

export const Social:React.FC<SocialProps> = ({  }) => {
    const promotions = usePromotions()

    const backgroundStyle = {
        position: 'absolute'
    }
    
    return (
        <Box className='Social-Component' style={{
            position: "relative",
            flexDirection: "column",
            width: "100%",
            gap: "1vw",
            color: "white"
        }}>
            <BackgroundImage className='background' style={{
                position: "absolute",
                top: "-10vw",
                left: "-5vw",
                zIndex: "-1",
                height: "125vw",
                width: "100vw"
            }}/>
            <Box className="follow-us" style={{
                flexDirection: "column"
            }}>
                <h3 style={{
                    fontSize: "5vw"
                }}>Nos siga em</h3>
                <h3 className='ig-at' style={{
                    fontSize: "6vw",
                    fontFamily: "Poppins",
                    marginLeft: "4vw"
                }}>@casaludica</h3>
            </Box>

            <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={5000}
            transitionTime={1000}
            >
                {promotions.map(promotion => 
                    <Box key={promotion.id}>
                        <img src={promotion.image_url} alt="" />
                        <p className="legend">{promotion.subtitle}</p>
                    </Box>
                )}
            </Carousel>

            <Box className="icons-container" style={{
                width: "100%",
                justifyContent: "center",
                gap: "2vw"
            }}>
                <InstagramIcon style={{ width: "15vw" }}/>
                <FacebookIcon style={{ width: "15vw" }}/>
                <YoutubeIcon style={{ width: "15vw" }}/>
                <WhatsappIcon style={{ width: "15vw" }}/>
            </Box>
        </Box>
    )
}