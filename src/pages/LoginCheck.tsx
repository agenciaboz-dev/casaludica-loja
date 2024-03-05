import React from "react"
import { LoginContainer } from "../components/Menu/LoginContainer"
import { DefaultWrapper } from "../components/DefaultWrapper"

interface LoginCheckProps {}

export const LoginCheck: React.FC<LoginCheckProps> = ({}) => {
    return (
        <DefaultWrapper>
            <LoginContainer />
        </DefaultWrapper>
    )
}
