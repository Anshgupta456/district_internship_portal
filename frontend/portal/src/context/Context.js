import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({children}) =>{
    const [tncAccepted,setTncAccepted] = useState(false);
    
    return (
        <Context.Provider value={{tncAccepted,setTncAccepted}}>
            {children}
        </Context.Provider>
    );
};