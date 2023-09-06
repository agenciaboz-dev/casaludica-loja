import React from 'react';
import { useNavigate } from "react-router-dom"

interface LinkProps {
    link: Link
}

export const LinkContainer:React.FC<LinkProps> = ({ link }) => {

    const navigate = useNavigate()
    
    return (
        <div className='Link-Component' >
            <h3 className='name' onClick={() => navigate(link.location)}>{link.name}</h3>
            <div className="sublinks">
                {link.sublinks?.map(sublink => <p key={sublink.id} onClick={() => navigate(sublink.location)}>{sublink.name}</p>)}
            </div>
        </div>
    )
}