import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { AuthContext } from "../../Context/AuthContext";
import { ProdutoContext } from "../../Context/ProdutosContext";
import { TotalContext } from "../../Context/TotalProdutosContext";

import api from "../../api";

export default function Produto(props) {

    const styles = StyleSheet.create({
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

    const auth = `Bearer ${token}`

    function adicionarProduto() {
        const produtoExiste = produtosList.findIndex(e => Number(e.id) == Number(props.id))

        if(produtoExiste < 0) {
            const data = {
                nome: props.nome,
                preco: props.preco,
                periodo: props.periodo,
                conteudos: props.conteudo
            }
    
            api.post(`carrinho/${props.id}`, data, {
                headers: {
                    'Authorization': auth
                }
            });
    
            setProdutosList([
                ...produtosList,
                {
                    id: props.id,
                    nome: props.nome,
                    preco: props.preco,
                    periodo: props.periodo,
                    conteudos: props.conteudo
                }
            ]);
    
            setTotal(total + Number(props.preco));
        }
    }

    function removerProduto() {
        api.delete(`carrinho/${props.id}`, {
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

        setProdutosList(
            produtosList.filter((val) => {
                return val.id != props.id
            })
        );

        setTotal(total - Number(props.preco));
    }

    return (
        <View style={styles.backgroundPlano}>
            <View style={{flex: 1,}}>
                <Text style={{fontSize: 20}}>{props.nome}</Text>
                    <View style={styles.conteudoPlano}>
                        {
                            props.carrinho ?
                                props.conteudo.map(e => {
                                    return (
                                        <Text style={{fontSize: 10}}>{e.conteudo}</Text>
                                    )
                                })
                            :
                            props.conteudo.map(e => {
                                    return (
                                        <Text style={{fontSize: 10}}>{e.conteudo}</Text>
                                    );
                                })
                        }
                    </View>
            </View>
            <View style={{alignItems: "center", justifyContent: 'flex-end', flex: 1}}>
                <Text style={{paddingBottom: 5}}>R$ {props.preco} {props.periodo}</Text>

                {
                    props.carrinho ? 
                    <TouchableOpacity style={{backgroundColor: "#9F3E3E", paddingHorizontal: 40, paddingVertical: 5, borderRadius: 10}} 
                    onPress={() => {removerProduto()}}>
                        <Text style={{color: 'white'}}>REMOVER</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{backgroundColor: "#9F3E3E", paddingHorizontal: 40, paddingVertical: 5, borderRadius: 10}}
                    onPress={() => {adicionarProduto()}}>
                        <Text style={{color: 'white'}}>ADICIONAR</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}