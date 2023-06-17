import { Button, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { useColors } from '../../../hooks/useColors';

interface NewsletterProps {
    
}

export const Newsletter:React.FC<NewsletterProps> = ({  }) => {
    const colors = useColors()

    const handleSubmit = (values: { name:string, email:string }) => {

    }

    const textFieldSx = {
        backgroundColor: '#D9D9D9', 
        borderRadius: '10vw'
    }

    const InputProps = {
        disableUnderline: true, 
        sx:{ 
            borderRadius: '10vw', 
            backgroundColor: '#D9D9D9' 
        }
    }

    const inputProps = {
        sx: { padding: '3vw' }
    }
    
    return (
        <div className='Newsletter-Component' >
            <p>Assine a nossa Newsletter e receba novidades e promoções!</p>
            <Formik initialValues={{name: '', email: ''}} onSubmit={handleSubmit} >
                {({values, handleChange}) => 
                <Form>
                    <TextField
                        id="name"
                        sx={textFieldSx}
                        placeholder={'Nome'}
                        InputProps={InputProps}
                        inputProps={inputProps}
                        variant="filled"
                        value={values.name}
                        onChange={handleChange}
                    />
                    <TextField
                        id="email"
                        sx={textFieldSx}
                        placeholder={'E-mail'}
                        InputProps={InputProps}
                        inputProps={inputProps}
                        variant="filled"
                        value={values.email}
                        onChange={handleChange}
                    />
                    <Button variant='contained' sx={{backgroundColor: colors.green, borderRadius: '10vw', fontFamily: 'BowlbyOneSC', fontWeight: '400'}} >Inscreva-se</Button>
                </Form>}
            </Formik>
        </div>
    )
}