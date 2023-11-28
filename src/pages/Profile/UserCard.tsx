import React from "react"
import { Avatar, Box } from "@mui/material"

interface UserCardProps {
    user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <Box sx={{ gap: "5vw" }}>
            <Avatar src={user.profilePicUrl} sx={{ height: "20vw", width: "20vw" }} />
            <Box
                sx={{
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                    color: "primary.main",
                    "& > p": { fontSize: "0.8rem" }
                }}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p style={{ fontWeight: "bold", textDecoration: "underline" }}>Editar imagem de perfil</p>
            </Box>
        </Box>
    )
}
