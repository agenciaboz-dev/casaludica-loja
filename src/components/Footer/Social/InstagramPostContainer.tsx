import React, { useEffect, useState } from "react"
import { Box, Button, MenuItem, Skeleton } from "@mui/material"
import { InstagramPost } from "../../../types/server/instagram/post"
import { api } from "../../../api"

interface InstagramPostProps {
    post: InstagramPost
}

export const InstagramPostContainer: React.FC<InstagramPostProps> = ({ post }) => {
    const [source, setSource] = useState("")

    const width = 450
    const height = 300

    const getSource = async () => {
        const response = await api.post("/instagram/image", { url: post.displayUrl })
        setSource(response.data)
    }

    useEffect(() => {
        getSource()
    }, [])

    return (
        <Box>
            {source ? (
                <Button onClick={() => window.open(post.url, "_blank")?.focus()}>
                    <img src={source} alt={post.alt} style={{ width, height }} />
                </Button>
            ) : (
                <Skeleton animation="wave" variant="rounded" sx={{ width, height, bgcolor: "#ffffff19" }} />
            )}
        </Box>
    )
}
