import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";

import ErroAlert from "../../errors/alert";
import { AuthContext } from "../../Context/AuthContext";
import api from "../../api";

export default function AlterarSenha({ navigation }) {
    
    const [senhaAtual, setSenhaAtual] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState("");
    const { token } = useContext(AuthContext);

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

        const data = {
            senhaAtual,
            senha,
            confirmaSenha: confirmarSenha
        };

        // Atualiza nova senha do usuário.
        api.patch('/user', data, {
            headers: {
                "Authorization": auth
            }
        })
        .then((response) => {
            setTimeout(() => {
                Alert.alert("Conta Atualizada", "Conta atualizada com sucesso!", [
                    { text: "OK" }])
            }, 100);
            navigation.navigate("Conta");
        })
        .catch((error) => {
            setErro(error.response.data.message);
        })
    }
    
    return (
        <View style={styles.background}>
            <View style={{marginBottom: 30, width: '100%'}}>
                <ErroAlert erro={erro}/>
            </View>
            <View style={{width: '100%'}}>
                <Text style={styles.textoInput}>SENHA ATUAL</Text>
                <TextInput secureTextEntry={true} style={styles.inputPadrao} placeholder="SENHA ATUAL" value={senhaAtual} onChangeText={setSenhaAtual}></TextInput>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
                <Text style={styles.textoInput}>SENHA NOVA</Text>
                <TextInput secureTextEntry={true} style={styles.inputPadrao} placeholder="SENHA NOVA" value={senha} onChangeText={setSenha}></TextInput>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
                <Text style={styles.textoInput}>CONFIRMAR SENHA</Text>
                <TextInput secureTextEntry={true} style={styles.inputPadrao} placeholder="CONFIRMAR SENHA" value={confirmarSenha} onChangeText={setConfirmarSenha}></TextInput>
            </View>

            <TouchableOpacity style={styles.salvar} onPress={() => {salvar()}}>
                <Text style={{textAlign: 'center', color: 'white', paddingVertical: 10}}>SALVAR</Text>
            </TouchableOpacity>
        </View>
    );
}