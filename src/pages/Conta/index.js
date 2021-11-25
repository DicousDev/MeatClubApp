import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { AuthContext } from "../../Context/AuthContext";
import { EnderecoContext } from "../../Context/EnderecoContext";

import api from "../../api";

export default function Conta({ navigation }) {
    
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const { token, setToken } = useContext(AuthContext);
    const { rua, setRua, numero, setNumero, bairro, setBairro, cidade, setCidade } = useContext(EnderecoContext);

    const styles = StyleSheet.create({
        backgroundUser: {
            height: '100%',
            padding: 30,
        },

        endereco: {
            marginTop: 20,
            backgroundColor: '#E9E9E9'
        },

        buttons: {
            backgroundColor: "#9F3E3E",
            paddingVertical: 10,
            borderRadius: 10,
        },
    });

    function carregaDados() {
        const auth = `Bearer ${token}`;

        api.get("/user", {
            headers: {
                'Authorization': auth
            }
        })
        .then((response) => {
            const { user } = response.data;
            const { endereco } = response.data

            setNome(user.nome);
            setEmail(user.email);
            setTelefone(user.telefone);
            setRua(endereco.rua);
            setBairro(endereco.bairro);
            setCidade(endereco.cidade);
            setNumero(endereco.numero);
        })
        .catch((error) => {
            console.log(error.response.data);
        })
    }

    carregaDados();
    
    return (
        <View style={styles.backgroundUser}>
            <Text style={{fontSize: 20}}>User: {nome}</Text>
            <View style={styles.endereco}>
                <Text>{rua}, {numero} - {bairro}, {cidade}</Text>
                <Text>{email}</Text>
                <Text>telefone: {telefone}</Text>
            </View>
            <View style={{marginTop: 50}}>
                <TouchableOpacity style={styles.buttons} onPress={() => {navigation.navigate("Alterar senha")}}>
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>ALTERAR SENHA</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
                <TouchableOpacity style={styles.buttons} onPress={() => {navigation.navigate("Alterar endereço")}}>
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>ALTERAR ENDEREÇO</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
                <TouchableOpacity style={styles.buttons} onPress={() => {navigation.navigate("Login"); setToken("")}}>
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>SAIR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}