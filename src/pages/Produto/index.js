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

    function removerProduto() {
        api.delete(`/user/carrinho/${props.id}`, {
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
                console.log(`${val.id} ========== ${val.id}`)
                return val.id != props.id
            })
        );

        console.log("SETPRODUTOLIST")
        console.log(produtosList);

        setTotal(total - Number(props.preco));
    }

    return (
        <View style={styles.backgroundPlano}>
            <View style={{flex: 1,}}>
                <Text style={{fontSize: 20}}>{props.nome}</Text>
                    <View style={styles.conteudoPlano}>
                        {
                            props.conteudo.map(e => {
                                    return (
                                        <Text style={{fontSize: 10}}>{e.DESCRICAO}</Text>
                                    )
                            })
                        }
                    </View>
            </View>
            <View style={{alignItems: "center", justifyContent: 'flex-end', flex: 1}}>
                <Text style={{paddingBottom: 5}}>R$ {props.preco} {props.periodo}</Text>
                <TouchableOpacity style={{backgroundColor: "#9F3E3E", paddingHorizontal: 40, paddingVertical: 5, borderRadius: 10}} 
                onPress={() => {removerProduto()}}>
                    <Text style={{color: 'white'}}>REMOVER</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}