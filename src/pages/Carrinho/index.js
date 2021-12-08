import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";

import { ProdutoContext } from "../../Context/ProdutosContext";
import { AuthContext } from "../../Context/AuthContext";
import { TotalContext } from "../../Context/TotalProdutosContext";
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

    const [requisicaoPronta, setRequisicaoPronta] = useState(false);
    const { token } = useContext(AuthContext);
    const { produtosList, setProdutosList } = useContext(ProdutoContext);
    const { total, setTotal } = useContext(TotalContext);
    const auth = `Bearer ${token}`;

    function planos() {
        navigation.navigate("Feed");
    }

    // Carrega todos os planos selecionados no carrinho do cliente.
    function carregaProdutos() {
        api.get("/user/carrinho", {
            headers: {
                'Authorization': auth
            }
        })
        .then((response) => {
            if(response.data) {
                setProdutosList(response.data);
            }
            
            // Calcula o preço total do carrinho.
            let soma = 0;
            response.data.map(e => {
                soma += Number(e.PRECO);
            });

            setTotal(soma);
            setRequisicaoPronta(true);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // Deleta todos os planos do carrinho do cliente.
    function finalizarCarrinho() {
        Alert.alert("Compra efetuada", "Compra efetuada com sucesso!")
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

    // Remove um plano selecionado do carrinho do cliente.
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

        // Cria uma nova lista dos planos selecionados.
        const list = produtosList.filter((val) => {
            return val.IDPLANO != id
        })

        // Seto uma nova lista de planos selecionados.
        setProdutosList(
            list
        );

        // Atualiza o total a pagar dos planos selecionados.
        setTotal(total - Number(preco));
        Alert.alert("Plano removido", "Plano removido do carrinho com sucesso!", [
            { text: "OK" }
        ])
    }

    useEffect(() => {
        carregaProdutos();
    }, [])

    return (
        <View>
            {
                // Enquanto estar fazendo a requisição, é feito um loading.
                (requisicaoPronta) ?
                    // Valida se há algum plano selecionado no carrinho do cliente.
                    (produtosList.length) > 0 ? 
                        <ScrollView>
                            {
                                // Percorrer por todos os planos selecionados.
                                produtosList.map(e => {
                                    return (
                                        <View style={styles.backgroundPlano}>
                                            <View style={{flex: 1,}}>
                                                <Text style={{fontSize: 20}}>{e.NOME}</Text>
                                                    <View style={styles.conteudoPlano}>
                                                        {                         
                                                            // Exibe os produtos de um plano.        
                                                            e.PRODUTOS.map(i => {
                                                                    return (
                                                                        <Text style={{fontSize: 10}}>{i.DESCRICAO}</Text>
                                                                    )
                                                            })
                                                        }
                                                    </View>
                                            </View>
                                            {/*  
                                                Carrega o preço e o período de um plano.
                                                Carrega o botão para remover o produto selecionado.
                                            */}
                                            <View style={{alignItems: "center", justifyContent: 'flex-end', flex: 1}}>
                                                <Text style={{paddingBottom: 5, color: '#9F3E3E'}}>R$ {e.PRECO} {e.PERIODO}</Text>
                                                <TouchableOpacity style={{backgroundColor: "#9F3E3E", paddingHorizontal: 40, paddingVertical: 5, borderRadius: 10}} 
                                                onPress={() => {removerProduto(e.IDPLANO, e.PRECO)}}>
                                                    <Text style={{color: 'white'}}>REMOVER</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            {/*
                                Carrega o total dos planos selecionados.
                                Carrega o botão para finalizar a compra. 
                            */}
                            <View style={styles.produtos}>
                                <Text style={{textAlign: 'center', paddingVertical: 10, color: '#9F3E3E'}}>Total R$ {total}</Text>
                                <TouchableOpacity style={styles.finalizarCompra} onPress={() => {finalizarCarrinho()}}>
                                    <Text style={{color: 'white', textAlign: 'center'}}>Finalizar compra</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    :
                        // Carrega carrinho vazio caso o cliente ainda não selecionou nenhum plano para compra.
                        <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: '80%'}}>
                            <Text style={{color: 'black', fontSize: 20}}>O CARRINHO ESTÁ VAZIO</Text>
                            <TouchableOpacity style={styles.assinaturas} onPress={() => {planos()}}>
                                <Text style={{color: 'white'}}>VER ASSINATURAS</Text>
                            </TouchableOpacity>
                        </View>
                :
                    <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#9F3E3E"/>
                    </View>
            }
        </View>
    );
}