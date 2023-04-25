import { createContext, useState } from 'react';
import React from 'react';

interface LoadingContextValue {
    value: boolean;
    setValue: (value:boolean) => void;
}

interface LoadingProviderProps {
    children: React.ReactNode
}

const LoadingContext = createContext<LoadingContextValue>({} as LoadingContextValue);

export default LoadingContext;

export const LoadingProvider:React.FC<LoadingProviderProps> = ({children}) => {
    const [value, setValue] = useState(false)

    return (
         <LoadingContext.Provider value={{value, setValue}}>
              {children}
         </LoadingContext.Provider>
    )
}