import React from 'react';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { SearchField } from '../../components/SearchField';
import './style.scss';

export const Home = () => {
    
    return (
        <div className='Home-Page' >
            <Background />
            <Header />
            <SearchField />
        </div>
    )
}