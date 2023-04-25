import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { usePromotions } from '../../../hooks/usePromotions';
import './style.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface PromotionsProps {
    
}

export const Promotions:React.FC<PromotionsProps> = ({  }) => {
    const promotions = usePromotions()
    
    return (
        <div className='Promotions-Component' >
            <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={5000}
            transitionTime={1000}
            >
                {promotions.map(promotion => 
                    <div key={promotion.id}>
                        <img src={promotion.image_url} alt="" />
                        <p className="legend">{promotion.subtitle}</p>
                    </div>
                )}
            </Carousel>
        </div>
    )
}