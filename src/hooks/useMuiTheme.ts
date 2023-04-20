import { createTheme } from "@mui/material"
import { useColors } from "./useColors"

export const useMuiTheme = () => {
    const colors = useColors()
    const THEME = createTheme({
        typography: {
        //  "fontFamily": ["Poppins"].join(','),
        //  "fontSize": 14,
        //  "fontWeightLight": 300,
        //  "fontWeightRegular": 400,
        //  "fontWeightMedium": 500
        },
        palette: {
            // mode: 'dark',

            primary: {
                main: colors.primary,
            },
            secondary: {
                main: '#fff',
            },
            text: {
                primary: colors.primary,
                // secondary: colors.primary,
                // disabled: colors.primary,
            },
            success: {
                main: colors.green
            }
            // error: {
            //     main: colors.red,
            // }
        }
    })
    
    return THEME
}