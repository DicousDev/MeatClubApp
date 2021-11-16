import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Produto from "../Produto/index"

import api from "../../api";

export default function Feed() {
    
    const styles = StyleSheet.create({
        planos: {
            width: '100%',
            height: '100%',
        },
    });

    const [produtos, setProdutos] = useState([]);
    
    function carregaProdutos() {
        api.get("produtos")
        .then((response) => {
            setProdutos(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    useEffect(() => {
        carregaProdutos();
    }, []);

    return(
        <View style={{marginBottom: 20}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View style={styles.planos}>
                    {produtos.map(e => {
                        return(
                            <Produto id={e.id} nome={e.nome} conteudo={e.conteudos} preco={e.preco} periodo={e.periodo} carrinho={false}/>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}