import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { usePromotions } from '../../../hooks/usePromotions';
//import './style.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box } from "@mui/material"
interface PromotionsProps {}

export const Promotions: React.FC<PromotionsProps> = ({}) => {
    const promotions = usePromotions()

    return (
        <Box className="Promotions-Component" sx={{ width: "100%", flexDirection: "column" }}>
            {promotions.length && (
                <Carousel showThumbs={false} autoPlay autoFocus={true} infiniteLoop interval={5000} transitionTime={1000} showStatus={false}>
                    {promotions.map((promotion) => (
                        <Box key={promotion.id}>
                            <img src={promotion.image_url} alt="" />
                            {/* <p className="legend">{promotion.subtitle}</p> */}
                        </Box>
                    ))}
                </Carousel>
            )}
        </Box>
    )
}