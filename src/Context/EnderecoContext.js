import React, {createContext, useState } from "react";
export const EnderecoContext = createContext();

const EnderecoProvider = ({children}) => {
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");

    return (
        <EnderecoContext.Provider value={{rua, setRua, numero, setNumero, bairro, setBairro, cidade, setCidade}}>
            {children}
        </EnderecoContext.Provider>
    );
}

export default EnderecoProvider;