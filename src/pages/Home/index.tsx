import React from 'react';
import { Background } from '../../components/Background';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { SearchField } from '../../components/SearchField';
import { Categories } from './Categories';
import { Collections } from './Collections';
import { FeaturedCategory } from './FeaturedCategory';
import { Popular } from './Popular';
import { Promotions } from './Promotions';
import { Box } from "@mui/material"
//import './style.scss';

export const Home = () => {
    return (
        <Box className="Home-Page" sx={{ width: "100%", flexDirection: "column", padding: "0 5vw", gap: "5vw" }}>
            <Background />
            <Header />

            <SearchField />
            <Collections />
            <Promotions />
            <Categories />
            <Popular />
            <FeaturedCategory />

            <Footer />
        </Box>
    )
}