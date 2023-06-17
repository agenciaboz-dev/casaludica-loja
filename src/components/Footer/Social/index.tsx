import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { usePromotions } from '../../../hooks/usePromotions';
import { ReactComponent as InstagramIcon } from '../../../images/socials/instagram.svg'
import { ReactComponent as FacebookIcon } from '../../../images/socials/facebook.svg'
import { ReactComponent as YoutubeIcon } from '../../../images/socials/youtube.svg'
import { ReactComponent as WhatsappIcon } from '../../../images/socials/whatsapp.svg'
import { ReactComponent as BackgroundImage } from '../../../images/background/socials.svg'

interface SocialProps {
    
}

export const Social:React.FC<SocialProps> = ({  }) => {
    const promotions = usePromotions()

    const backgroundStyle = {
        position: 'absolute'
    }
    
    return (
        <div className='Social-Component' >
            <BackgroundImage className='background' />
            <div className="follow-us">
                <h3>Nos siga em</h3>
                <h3 className='ig-at'>@casaludica</h3>
            </div>

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

            <div className="icons-container">
                <InstagramIcon />
                <FacebookIcon />
                <YoutubeIcon />
                <WhatsappIcon />
            </div>
        </div>
    )
}