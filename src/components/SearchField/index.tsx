import React from 'react';
// import './style.scss';
import { TextField, InputAdornment, useMediaQuery } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { Formik, Form } from "formik"
import { useNavigate } from "react-router-dom"

interface SearchFieldProps {}

interface formValues {
    search: string
}

export const SearchField: React.FC<SearchFieldProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const navigate = useNavigate()

    const handleSubmit = (values: formValues) => {
        navigate(`/search/name/${values.search}`)
    }

    return (
        <div
            className="SearchField-Component"
            style={{
                width: isMobile ? "100%" : "75%",
            }}
        >
            <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <TextField
                            id="search"
                            sx={{ backgroundColor: "white", borderRadius: isMobile ? "2vw" : "0.5vw" }}
                            placeholder={"Estou procurando por..."}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ marginTop: "0 !important" }}>
                                        <SearchIcon
                                            sx={{
                                                opacity: 0.5,
                                                width: isMobile ? "7vw" : "2vw",
                                                height: "auto",
                                                marginRight: isMobile ? "-1.5vw" : "0",
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                                sx: { paddingLeft: isMobile ? "1.5vw" : "0.5vw", borderRadius: isMobile ? "2vw" : "0.5vw" },
                                style: { fontSize: isMobile ? "5vw" : "1vw" },
                            }}
                            inputProps={{ sx: { padding: isMobile ? "3vw 0" : "0.75vw 0 0.5vw 0" } }}
                            variant="filled"
                            value={values.search}
                            onChange={handleChange}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}