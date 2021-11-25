import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import { ProdutoContext } from "../../Context/ProdutosContext";
import { AuthContext } from "../../Context/AuthContext";
import { TotalContext } from "../../Context/TotalProdutosContext";
import api from "../../api";

export default function Feed() {
    
    const styles = StyleSheet.create({
        planos: {
            width: '100%',
            height: '100%',
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
    const [produtos, setProdutos] = useState([]);
    const { produtosList, setProdutosList } = useContext(ProdutoContext);
    const { total, setTotal } = useContext(TotalContext);
    const auth = `Bearer ${token}`
    
    function carregaProdutos() {
        api.get("/plano")
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

    function adicionarProduto(idPlano, nome, preco, periodo, conteudo) {
        const produtoExiste = produtos.findIndex(e => Number(e.IDPLANO) == Number(idPlano))

        if(produtoExiste >= 0) {
            const data = {
                nome: nome,
                preco: preco,
                periodo: periodo,
                conteudos: conteudo
            }
    
            api.post(`/user/carrinho/${idPlano}`, data, {
                headers: {
                    'Authorization': auth
                }
            })
            .then((response) => {
                console.log("Plano adicionado no carrinho.")
            })
            .catch((error) => {
                console.log("Error ao tentar adicionar plano ao carrinho");
                console.log(error);
            })

            api.get(`/plano/${idPlano}`, {
                headers: {
                    'Authorization': auth
                }
            })
            .then((response) => {
                console.log(response.data);
                setTotal(total + Number(response.data.PRECO));
                setProdutosList([
                    ...produtosList,
                    response.data
                ])
            })
            .catch((error) => {
                console.log("Erro ao tentar obter plano.");
                console.log(error);
            })
        }
    }

    return(
        <View style={{marginBottom: 20}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View style={styles.planos}>
                    {produtos.map(e => {
                        return(
                            <View style={styles.backgroundPlano}>
                                <View style={{flex: 1,}}>
                                    <Text style={{fontSize: 20}}>{e.NOME}</Text>
                                        <View style={styles.conteudoPlano}>
                                            {
                                                e.PRODUTOS.map(w => {
                                                    return (
                                                        <Text style={{fontSize: 10}}>{w.DESCRICAO}</Text>
                                                    );
                                                })
                                            }
                                        </View>
                                </View>
                                <View style={{alignItems: "center", justifyContent: 'flex-end', flex: 1}}>
                                    <Text style={{paddingBottom: 5}}>R$ {e.PRECO} {e.PERIODO}</Text>
                                        <TouchableOpacity style={{backgroundColor: "#9F3E3E", paddingHorizontal: 40, paddingVertical: 5, borderRadius: 10}}
                                        onPress={() => {adicionarProduto(e.IDPLANO)}}>
                                            <Text style={{color: 'white'}}>ADICIONAR</Text>
                                        </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}