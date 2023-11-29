import React, { useState } from "react"
import { Box, Collapse, MenuItem } from "@mui/material"
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown"

interface CollapsibleMenuProps {
    title: string
    children?: React.ReactNode
}

export const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({ title, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Box
            sx={{
                color: "primary.main",
                fontSize: "1.2rem",
                borderBottom: "1px solid",
                borderColor: "primary.main",
                flexDirection: "column"
            }}>
            <MenuItem
                sx={{ justifyContent: "flex-start", fontWeight: "bold", gap: "3vw", alignItems: "center" }}
                onClick={() => setOpen((value) => !value)}>
                {title}
                <ExpandCircleDownIcon sx={{ rotate: open ? "-180deg" : "", transition: "0.3s" }} />
            </MenuItem>
            <Collapse in={open}>
                <Box sx={{ padding: "0 5vw", borderTop: "1px solid", borderColor: "primary.main", width: "100%" }}>{children}</Box>
            </Collapse>
        </Box>
    )
}
