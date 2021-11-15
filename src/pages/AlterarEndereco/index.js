import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

import { AuthContext } from "../../Context/AuthContext";
import { EnderecoContext } from "../../Context/EnderecoContext";

import api from "../../api";

export default function AlterarEndereco({ navigation }) {
    
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const { token } = useContext(AuthContext);
    const enderecoContext = useContext(EnderecoContext);

    const styles = StyleSheet.create({
        background: {
            height: '100%',
            width: '100%',
            padding: 20,
            alignItems: 'center',
            justifyContent: 'flex-start'
        },

        textoInput: {
            color: '#676767',
            marginBottom: 5
        },

        inputPadrao: {
            backgroundColor: "#E9E9E9",
            borderRadius: 5
        },

        salvar: {
            width: '100%',
            backgroundColor: "#9F3E3E",
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 20
        }
    });

    async function salvar() {
        const auth = `Bearer ${token}`;

        const data = {};

        if(rua) {
            data.rua = rua;
        }

        if(bairro) {
            data.bairro = bairro;
        }

        if(cidade) {
            data.cidade = cidade;
        }

        if(numero) {
            data.numero = numero;
        }

        api.patch("/endereco", data, {
            headers: {
                "Authorization": auth
            }
        })
        .then((response) => {
            navigation.navigate("Conta");
            enderecoContext.setRua = rua;
            enderecoContext.setBairro = bairro;
            enderecoContext.setCidade = cidade;
            enderecoContext.setNumero = numero; 
            setTimeout(() => {alert("Endereço atualizado com sucesso!")}, 100);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    return (
        <View style={styles.background}>
            <View style={{width: '100%'}}>
                <Text style={styles.textoInput}>RUA</Text>
                <TextInput style={styles.inputPadrao} placeholder="RUA" value={rua} onChangeText={setRua}></TextInput>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
                <Text style={styles.textoInput}>NÚMERO</Text>
                <TextInput style={styles.inputPadrao} placeholder="NÚMERO" value={numero} onChangeText={setNumero}></TextInput>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
                <Text style={styles.textoInput}>BAIRRO</Text>
                <TextInput style={styles.inputPadrao} placeholder="BAIRRO" value={bairro} onChangeText={setBairro}></TextInput>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
                <Text style={styles.textoInput}>CIDADE</Text>
                <TextInput style={styles.inputPadrao} placeholder="CIDADE" value={cidade} onChangeText={setCidade}></TextInput>
            </View>
            <TouchableOpacity style={styles.salvar} onPress={() => {salvar()}}>
                <Text style={{textAlign: 'center', color: 'white', paddingVertical: 10}}>SALVAR</Text>
            </TouchableOpacity>
        </View>
    );
}