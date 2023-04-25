import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useColors } from '../../hooks/useColors';

interface CurrencyTextProps {
    value: number|string
    color?: string
}

export const CurrencyText:React.FC<CurrencyTextProps> = ({ value, color }) => {
    const colors = useColors()
    
    return (
        <CurrencyFormat
            value={value} 
            displayType='text' 
            thousandSeparator='.'
            decimalSeparator=','
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={'R$ '}
            style={{color: color || colors.primary2}}
        />
    )
}