import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

import { ProdutoContext } from "../../Context/ProdutosContext";
import { AuthContext } from "../../Context/AuthContext";
import { TotalContext } from "../../Context/TotalProdutosContext";
import Produto from "../Produto";
import api from "../../api";


export default function Carrinho({ navigation }) {
    const styles = StyleSheet.create({
        assinaturas: {
            marginTop: 20,
            backgroundColor: '#9F3E3E',
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 10
        },
        
        produtos: {
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20
        },

        finalizarCompra: {
            marginTop: 5,
            backgroundColor: "#9F3E3E",
            paddingVertical: 10,
            paddingHorizontal: 50
        }
    });

    const { token } = useContext(AuthContext);
    const { produtosList, setProdutosList } = useContext(ProdutoContext);
    const { total, setTotal } = useContext(TotalContext);
    const auth = `Bearer ${token}`;

    function planos() {
        navigation.navigate("Feed");
    }

    function carregaProdutos() {
        console.log("Carregando PRODUTOS NO CARRINHO");
        api.get("/carrinho", {
            headers: {
                'Authorization': auth
            }
        })
        .then((response) => {
            if(response.data[0]) {
                setProdutosList(response.data[0]);
            }
            
            let soma = 0;
            response.data[0].map(e => {
                soma += Number(e.preco);
            });

            setTotal(soma);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function finalizarCarrinho() {
        api.delete("/carrinho", {
            headers: {
                'Authorization': auth
            }
        })
        .then((response) => {
            console.log(response.data);
            setProdutosList([]);
            setTotal(0);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        carregaProdutos();
    }, [])

    return (
        <View>
            {
                produtosList.length > 0 ? 
                <ScrollView>
                    {produtosList.map(e => {
                        console.log("PRODUTOS LIST " + e.conteudos);
                        return (
                            <Produto id={e.id} nome={e.nome} conteudo={e.conteudos} preco={e.preco} periodo={e.periodo} carrinho={true}/>
                        )
                    })}
                    <View style={styles.produtos}>
                        <Text style={{textAlign: 'center', paddingVertical: 10, color: '#9F3E3E'}}>Total R$ {total}</Text>
                        <TouchableOpacity style={styles.finalizarCompra} onPress={() => {finalizarCarrinho()}}>
                            <Text style={{color: 'white', textAlign: 'center'}}>Finalizar compra</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                :
                <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: '80%'}}>
                    <Text style={{color: 'black', fontSize: 20}}>O CARRINHO ESTÁ VAZIO</Text>
                    <TouchableOpacity style={styles.assinaturas} onPress={() => {planos()}}>
                        <Text style={{color: 'white'}}>VER ASSINATURAS</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}