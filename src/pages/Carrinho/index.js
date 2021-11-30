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
        },

        backgroundPlano: {
            backgroundColor: "#E1E1E1",
            width: '100%',
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },

        conteudoPlano: {
            paddingTop: 10
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
        console.log("Carregando PRODUTOS NO CARRINHO");
        console.log("Carregando PRODUTOS NO CARRINHO");
        console.log("Carregando PRODUTOS NO CARRINHO");
        console.log("Carregando PRODUTOS NO CARRINHO");
        console.log("Carregando PRODUTOS NO CARRINHO");
        console.log("Carregando PRODUTOS NO CARRINHO");
        console.log("Carregando PRODUTOS NO CARRINHO");
        console.log("Carregando PRODUTOS NO CARRINHO");
        console.log("Carregando PRODUTOS NO CARRINHO");
        console.log("Carregando PRODUTOS NO CARRINHO");
        console.log("Carregando PRODUTOS NO CARRINHO");
        console.log("Carregando PRODUTOS NO CARRINHO");

        api.get("/user/carrinho", {
            headers: {
                'Authorization': auth
            }
        })
        .then((response) => {
            if(response.data) {
                setProdutosList(response.data);
            }
            
            let soma = 0;
            response.data.map(e => {
                soma += Number(e.PRECO);
            });

            setTotal(soma);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function finalizarCarrinho() {
        api.delete("/user/carrinho", {
            headers: {
                'Authorization': auth
            }
        })
        .then((response) => {
            setProdutosList([]);
            setTotal(0);
        })
        .catch((error) => {
            console.log("Erro ao tentar excluir todos os produtos do carrinho.");
            console.log(error);
        })
    }

    function removerProduto(id, preco) {
        api.delete(`/user/carrinho/${id}`, {
            headers: {
                'Authorization': auth
            }
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })

        const list = produtosList.filter((val) => {
            return val.IDPLANO != id
        })

        setProdutosList(
            list
        );

        setTotal(total - Number(preco));
    }

    useEffect(() => {
        carregaProdutos();
    }, [])

    // carregaProdutos()

    return (
        <View>
            {
                produtosList.length > 0 ? 
                    <ScrollView>
                        {
                        produtosList.map(e => {
                            return (
                                <View style={styles.backgroundPlano}>
                                <View style={{flex: 1,}}>
                                    <Text style={{fontSize: 20}}>{e.NOME}</Text>
                                        <View style={styles.conteudoPlano}>
                                            {                                                
                                                e.PRODUTOS.map(i => {
                                                        return (
                                                            <Text style={{fontSize: 10}}>{i.DESCRICAO}</Text>
                                                        )
                                                })
                                            }
                                        </View>
                                </View>
                                    <View style={{alignItems: "center", justifyContent: 'flex-end', flex: 1}}>
                                        <Text style={{paddingBottom: 5}}>R$ {e.PRECO} {e.PERIODO}</Text>
                                        <TouchableOpacity style={{backgroundColor: "#9F3E3E", paddingHorizontal: 40, paddingVertical: 5, borderRadius: 10}} 
                                        onPress={() => {removerProduto(e.IDPLANO, e.PRECO)}}>
                                            <Text style={{color: 'white'}}>REMOVER</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
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