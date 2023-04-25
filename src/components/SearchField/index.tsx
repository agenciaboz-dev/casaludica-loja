import React from 'react';
import './style.scss';
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Formik , Form} from 'formik';
import { useApi } from '../../hooks/useApi';
import { Product } from '../../definitions/products';
import { useNavigate } from 'react-router-dom';

interface SearchFieldProps {
    
}

interface formValues {
    search: string
}

export const SearchField:React.FC<SearchFieldProps> = ({  }) => {

    const api = useApi()
    const navigate = useNavigate()

    const handleSubmit = (values:formValues) => {
        if (values.search) {
            api.products.search(values, (response: { data: Product[] }) => {
                console.log(response.data)
                navigate('/search', { state: { products: response.data } })
            })
        } else {
            api.products.get((response: { data: Product[] }) => {
                console.log(response.data)
                navigate('/search', { state: { products: response.data } })
            })
        }
    }
    
    return (
        <div className='SearchField-Component' >
            <Formik initialValues={{search: ''}} onSubmit={handleSubmit} >
                {({values, handleChange}) => 
                <Form>
                    <TextField
                        id="search"
                        sx={{backgroundColor: 'white', borderRadius: '2vw'}}
                        placeholder={'Estou procurando por...'}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" sx={{marginTop: '0 !important'}}>
                                    <SearchIcon sx={{opacity: 0.5, width: '7vw', height: 'auto'}} />
                                </InputAdornment>
                            ),
                            disableUnderline: true,
                        }}
                        inputProps={{sx: {padding: '3vw 0'}}}
                        variant="filled"
                        value={values.search}
                        onChange={handleChange}
                    />
                </Form>}
            </Formik>
        </div>
    )
}