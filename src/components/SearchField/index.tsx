import React from 'react';
import './style.scss';
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

interface SearchFieldProps {
    
}

export const SearchField:React.FC<SearchFieldProps> = ({  }) => {
    
    return (
        <div className='SearchField-Component' >
            <TextField
                id="input-with-icon-textfield"
                sx={{backgroundColor: 'white'}}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" sx={{marginTop: '0 !important'}}>
                            <SearchIcon sx={{opacity: 0.5, width: '7vw', height: 'auto'}} />
                        </InputAdornment>
                    ),
                }}
                inputProps={{sx: {padding: '3vw 0'}}}
                variant="filled"
            />
        </div>
    )
}