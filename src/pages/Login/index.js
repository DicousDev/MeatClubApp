import React, {  useContext, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles";

import { AuthContext } from "../../Context/AuthContext";

import Alert from "../../errors/alert";

import api from "../../api";

export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const { setToken } = useContext(AuthContext);

    function cadastrar() {
        limparInputs();
        navigation.navigate("Cadastro");
    }

    function logar() {
        //Teste
        const data = {
            email: "pijack123@gmail.com",
            password: "teste123"
        }

        // Original
        // const data = {
        //     email,
        //     password: senha
        // }

        api.post("/auth/login", data)
        .then((response) => {
            console.log(response.data.message);
            setToken(response.data.token);
            limparInputs();
            navigation.navigate("Home");
        })
        .catch((error) => {
            setErro(error.response.data.message);
        });
    }

    function limparInputs() {
        setEmail("");
        setSenha("");
        setErro("");
    }

    return (
        <View style={styles.background}>
            <Alert erro={erro}/>
            <View style={styles.backgroundLogin}>
                <Text style={{fontSize: 40, color: '#9F3E3E', marginBottom: 10}}>Log In</Text>
                <View style={styles.campoEmail}>
                    <Text style={styles.emailText}>EMAIL</Text>
                    <TextInput placeholder="example@gmail.com" style={styles.emailInput} value={email} onChangeText={setEmail}/>
                </View>
                <View style={styles.campoSenha}>
                    <Text style={styles.senhaText}>SENHA</Text>
                    <TextInput secureTextEntry={true} style={styles.senhaInput} value={senha} onChangeText={setSenha}/>
                </View>
                <View>
                    <TouchableOpacity style={styles.logar} onPress={() => {logar()}}>
                        <Text style={styles.logarText}>LOGAR</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cadastroText}>
                    <Text>
                        Ainda não possui conta ?
                    </Text>
                    <TouchableOpacity onPress={() => {cadastrar()}}>
                        <Text style={{color: '#623033'}}>Faça seu cadastro</Text>
                        {/* <Text style={{color: 'white', backgroundColor: '#9F3E3E', paddingHorizontal: 20, borderRadius: 5, paddingVertical: 5, alignItems: 'center'}}>Faça seu cadastro</Text> */}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    ); 
}