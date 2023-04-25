import React from 'react';
import { About } from './About';
import { Copyright } from './Copyright';
import { Newsletter } from './Newsletter';
import { Social } from './Social';
import './style.scss';

interface FooterProps {
    
}

export const Footer:React.FC<FooterProps> = ({  }) => {
    
    return (
        <div className='Footer-Component' >
            <Social />
            <About />
            <Newsletter />
            <Copyright />
        </div>
    )
}