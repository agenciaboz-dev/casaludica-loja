import React, { useEffect, useState } from "react"
import { Box, Button, MenuItem, Skeleton, useMediaQuery } from "@mui/material"
import { InstagramPost } from "../../../types/server/instagram/post"
import { api } from "../../../api"

interface InstagramPostProps {
    post: InstagramPost
}

export const InstagramPostContainer: React.FC<InstagramPostProps> = ({ post }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [source, setSource] = useState("")

    const width = isMobile ? "76vw" : "16vw"
    const height = isMobile ? "76vw" : "16vw"

    const getSource = async () => {
        const response = await api.post("/instagram/image", { url: post.displayUrl })
        setSource(response.data)
    }

    useEffect(() => {
        getSource()
    }, [])

    return (
        <Box
            sx={
                {
                    // margin: isMobile ? "0 10vw" : 0,
                }
            }
        >
            {source ? (
                <Button onClick={() => window.open(post.url, "_blank")?.focus()}>
                    <img src={source} alt={post.alt} style={{ width, height, objectFit: "cover" }} />
                </Button>
            ) : (
                <Skeleton animation="wave" variant="rounded" sx={{ width, height, bgcolor: "#ffffff19" }} />
            )}
        </Box>
    )
}
