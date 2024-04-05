import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { UserCard } from "./UserCard"
import { Address } from "./Address"
import { Safety } from "./Safety"
import { AccountDetails } from "./AccountDetails"

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
    const { user } = useUser()

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate("/")
    }, [])

    return (
        <DefaultWrapper>
            {user ? (
                <Box sx={{ flexDirection: "column", paddingBottom: "10vw" }}>
                    <UserCard user={user} />
                    <AccountDetails user={user} />
                    <Address user={user} />
                    <Safety user={user} />
                </Box>
            ) : (
                <></>
            )}
        </DefaultWrapper>
    )
}
