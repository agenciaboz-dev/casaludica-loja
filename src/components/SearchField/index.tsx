import React from 'react';
import './style.scss';
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from "formik"
import { useNavigate } from "react-router-dom"

interface SearchFieldProps {}

interface formValues {
    search: string
}

export const SearchField: React.FC<SearchFieldProps> = ({}) => {
    const navigate = useNavigate()

    const handleSubmit = (values: formValues) => {
        navigate(`/search/name/${values.search}`)
    }

    return (
        <div className="SearchField-Component">
            <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <TextField
                            id="search"
                            sx={{ backgroundColor: "white", borderRadius: "2vw" }}
                            placeholder={"Estou procurando por..."}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ marginTop: "0 !important" }}>
                                        <SearchIcon sx={{ opacity: 0.5, width: "7vw", height: "auto", marginRight: "-1.5vw" }} />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                                sx: {paddingLeft: "1.5vw"}
                            }}
                            inputProps={{ sx: { padding: "3vw 0" } }}
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