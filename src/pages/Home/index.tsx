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
import { Box, useMediaQuery } from "@mui/material"
//import './style.scss';

export const Home = () => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            className="Home-Page"
            sx={{ width: "100%", flexDirection: "column", padding: isMobile ? "0 5vw" : "0 10vw", gap: isMobile ? "5vw" : "2vw" }}
        >
            <Background />
            <Header />
            {isMobile && <SearchField />}
            <Collections />
            <Promotions />
            <Categories />
            <Popular />
            <FeaturedCategory />

            <Footer />
        </Box>
    )
}