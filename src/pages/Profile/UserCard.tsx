import React, { useEffect, useRef, useState } from "react"
import { Avatar, Box, CircularProgress, useMediaQuery } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import { useApi } from "../../hooks/useApi"
import { useUser } from "../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"

interface UserCardProps {
    user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const ref = useRef<HTMLInputElement>(null)
    const api = useApi()

    const { setUser } = useUser()
    const { snackbar } = useSnackbar()

    const [image, setImage] = useState<File>()
    const [uploading, setUploading] = useState(false)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            setImage(files[0])
        }
    }

    const isMobile = useMediaQuery("(orientation: portrait)")

    const handleUpload = () => {
        if (!image || uploading) return

        setUploading(true)
        console.log("uploading image")

        const formData = new FormData()
        formData.append("file", image)

        api.user
            .uploadProfilePic(formData, user.id)
            .then((response) => {
                const user = response.data

                if (user) {
                    console.log(user)
                    setUser(user)
                    snackbar({ severity: "success", text: "Imagem de perfil atualizada!" })
                } else {
                    snackbar({ severity: "error", text: "Erro ao atualizar imagem" })
                }
            })
            .finally(() => {
                setUploading(false)
                setImage(undefined)
            })
    }

    return (
        <Box sx={{ gap: isMobile ? "5vw" : "3vw", paddingBottom: isMobile ? "" : "1.2vw" }}>
            <Avatar
                src={image ? URL.createObjectURL(image) : user.profilePicUrl}
                sx={{ height: isMobile ? "20vw" : "7vw", width: isMobile ? "20vw" : "7vw" }}
            />
            <Box
                sx={{
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                    color: "primary.main",
                    "& > p": { fontSize: "0.8rem" },
                    gap: isMobile ? "" : "0.5vw",
                }}
            >
                <h3 style={{ fontSize: isMobile ? "" : "1.5rem" }}>{user.name}</h3>
                <p style={{ fontSize: isMobile ? "" : "1rem" }}>{user.email}</p>
                {image ? (
                    <Box
                        sx={{
                            fontSize: "0.7rem",
                            alignItems: "center",
                            gap: "2vw",
                            textDecoration: "underline",
                            fontWeight: "bold",
                        }}
                    >
                        Confirmar imagem?
                        <Box sx={{ alignItems: "center", gap: "1vw" }} onClick={() => setImage(undefined)}>
                            Não <CancelIcon color="error" />
                        </Box>
                        <Box sx={{ alignItems: "center", gap: "1vw" }} onClick={() => handleUpload()}>
                            Sim {uploading ? <CircularProgress size="1.5rem" /> : <CheckCircleIcon color="success" />}
                        </Box>
                    </Box>
                ) : (
                    <p
                        style={{ fontSize: isMobile ? "" : "1rem", fontWeight: "bold", textDecoration: "underline" }}
                        onClick={() => ref.current?.click()}
                    >
                        Editar imagem de perfil
                        <input ref={ref} type="file" hidden onChange={(event) => handleImageChange(event)} />
                    </p>
                )}
            </Box>
        </Box>
    )
}
