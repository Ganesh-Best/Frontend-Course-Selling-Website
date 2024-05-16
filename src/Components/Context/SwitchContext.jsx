import React,{useContext,createContext, useState} from 'react'

export const SwitchContext = createContext();

export const SwitchProvider = ({children}) => {
     const [admin,setAdmin] = useState("user")
    return <SwitchContext.Provider value={{admin,setAdmin}}  >
    {children}
    </SwitchContext.Provider>
}
