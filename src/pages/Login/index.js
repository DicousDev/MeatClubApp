import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles";

export default function Login({ navigation }) {

    function cadastrar() {
        navigation.navigate("Cadastro");
    }

    function logar() {

    }

    return (
        <View style={styles.background}>
            <View style={styles.backgroundLogin}>
                <View style={styles.campoEmail}>
                    <Text style={styles.emailText}>EMAIL</Text>
                    <TextInput placeholder="example@gmail.com" style={styles.emailInput}/>
                </View>
                <View style={styles.campoSenha}>
                    <Text style={styles.senhaText}>SENHA</Text>
                    <TextInput placeholder="*********" style={styles.senhaInput}/>
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
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    ); 
}