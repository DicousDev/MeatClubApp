import React, { createContext, useState } from "react";
export const TotalContext = createContext();

const TotalProvider = ({children}) => {
    const [total, setTotal] = useState(0);

    return (
        <TotalContext.Provider value={{total, setTotal}}>
            {children}
        </TotalContext.Provider>
    );
}

export default TotalProvider;