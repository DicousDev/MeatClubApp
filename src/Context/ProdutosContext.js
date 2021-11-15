import React, { createContext, useState } from "react";
export const ProdutoContext = createContext();

const ProdutoProvider = ({children}) => {
    const [produtosList, setProdutosList] = useState([]);

    return (
        <ProdutoContext.Provider value={{produtosList, setProdutosList}}>
            {children}
        </ProdutoContext.Provider>
    );
}

export default ProdutoProvider;