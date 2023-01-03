import React, { createContext, useContext, useState } from 'react'


const appContext = createContext({})

export const useAppContext = () => {
    return useContext(appContext)
}

export const AppContextProvider = ({ children }) => {
    const [start, setStart] = useState(false)


    return (
        <appContext.Provider
            value={{
                setStart,
                start
            }}
        >
            {children}
        </appContext.Provider>
    )
}