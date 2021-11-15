import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

import { ProdutoContext } from "../../Context/ProdutosContext";
import { AuthContext } from "../../Context/AuthContext";
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
    const [total, setTotal] = useState(0);

    function planos() {
        navigation.navigate("Feed");
    }

    function carregaProdutos() {
        const auth = `Bearer ${token}`;

        api.get("/carrinho", {
            headers: {
                'Authorization': auth
            }
        })
        .then((response) => {
            console.log(response.data);
            setProdutosList(response.data);
            
            let soma = 0;
            response.data.map(e => {
                soma += Number(e.preco);
            });

            setTotal(soma);
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
                        return (
                            <Produto nome={e.nome} conteudo={e.conteudo} preco={e.preco} periodo={e.periodo} carrinho={true}/>
                        )
                    })}
                    <View style={styles.produtos}>
                        <Text style={{textAlign: 'center', paddingVertical: 10, color: '#9F3E3E'}}>Total R$ {total}</Text>
                        <TouchableOpacity style={styles.finalizarCompra}>
                            <Text style={{color: 'white', textAlign: 'center'}}>Finalizar compra</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                :
                <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: '80%'}}>
                    <Text style={{color: 'black', fontSize: 20}}>O CARRINHO AINDA ESTÁ VAZIO</Text>
                    <TouchableOpacity style={styles.assinaturas} onPress={() => {planos()}}>
                        <Text style={{color: 'white'}}>VER ASSINATURAS</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}