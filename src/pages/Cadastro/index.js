import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import styles from "./styles";

import ErroAlert from "../../errors/alert";

import api from "../../api";

export default function Cadastro({ navigation }) {

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");

    const [erro, setErro] = useState("");

    function cadastrar() {
        setErro("");
        const data = {
            nome,
            sobrenome,
            email,
            senha,
            confirmarSenha: confirmaSenha,
            cpf,
            telefone,
            rua,
            numero,
            bairro,
            cidade
        }

        api.post("/auth/register", data)
        .then((response) => {
            limpaInputs();
            navigation.navigate("Login");
            setTimeout(() => {
                Alert.alert("Cadastro", "Cadastro realizado com sucesso!", [
                    { text: "OK" }])
                }, 100);
        })
        .catch((error) => {
            setErro(error.response.data.message);
        });
    }

    function limpaInputs() {
        setNome("");
        setSobrenome("");
        setEmail("");
        setSenha("");
        setConfirmaSenha("");
        setCpf("");
        setTelefone("");
        setRua("");
        setNumero("");
        setBairro("");
        setCidade("");
        setErro("");
    }

    return (
        <View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <ErroAlert erro={erro}/>
                <View style={styles.background}>
                    <View style={styles.backgroundCadastro}>
                        <View style={styles.campoNomes}>
                            <View style={styles.nome}>
                                <Text style={styles.textoInput}>NOME</Text>                                
                                <TextInput style={styles.input} value={nome} onChangeText={setNome}/>
                            </View>
                            <View style={styles.sobrenome}>
                                <Text style={styles.textoInput}>SOBRENOME</Text>
                                <TextInput style={styles.input} value={sobrenome} onChangeText={setSobrenome}/>
                            </View>
                        </View>

                        <View style={styles.email}>
                            <Text style={styles.textoInput}>EMAIL</Text>
                            <TextInput style={styles.input} placeholder="example@gmail.com" value={email} onChangeText={setEmail}/>
                        </View>

                        <View style={styles.senha}>
                            <Text style={styles.textoInput}>SENHA</Text>
                            <TextInput secureTextEntry style={styles.input} value={senha} onChangeText={setSenha}/>
                        </View>

                        <View style={styles.confirmaSenha}>
                            <Text style={styles.textoInput}>CONFIRMAR SENHA</Text>
                            <TextInput secureTextEntry style={styles.input} value={confirmaSenha} onChangeText={setConfirmaSenha}/>
                        </View>

                        <View style={styles.cpf}>
                            <Text style={styles.textoInput}>CPF</Text>
                            <TextInput style={styles.input} placeholder="999.999.999-99" value={cpf} onChangeText={setCpf}/>
                        </View>

                        <View style={styles.telefone}>
                            <Text style={styles.textoInput}>TELEFONE</Text>
                            <TextInput style={styles.input} placeholder="(99) 9 9999-9999" value={telefone} onChangeText={setTelefone}/>
                        </View>

                        <View style={styles.endereco}>
                            <View style={styles.rua}>
                                <Text style={styles.textoInput}>RUA</Text>
                                <TextInput style={styles.input} value={rua} onChangeText={setRua}/>
                            </View>

                            <View style={styles.numero}>
                                <Text style={styles.textoInput}>NÚMERO</Text>
                                <TextInput style={styles.input} value={numero} onChangeText={setNumero}/>
                            </View>
                        </View>
                        <View style={styles.endereco2}>
                            <View style={styles.bairro}>
                                <Text style={styles.textoInput}>BAIRRO</Text>
                                <TextInput style={styles.input} value={bairro} onChangeText={setBairro}/>
                            </View>
                            <View style={styles.cidade}>
                                <Text style={styles.textoInput}>CIDADE</Text>
                                <TextInput style={styles.input} value={cidade} onChangeText={setCidade}/>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.cadastro} onPress={() => {cadastrar()}}>
                                <Text style={{color: 'white', fontSize: 20}}>CADASTRAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}