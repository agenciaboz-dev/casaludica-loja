import React from "react"
import { Categories } from "./Categories"
import { FeaturedCategory } from "./FeaturedCategory"
import { Popular } from "./Popular"
import { Promotions } from "./Promotions"
import { DefaultWrapper } from "../../components/DefaultWrapper"
//import './style.scss';

export const Home = () => {
    return (
        <DefaultWrapper>
            <Promotions />
            <Categories />
            <Popular />
            <FeaturedCategory />
        </DefaultWrapper>
    )
}
