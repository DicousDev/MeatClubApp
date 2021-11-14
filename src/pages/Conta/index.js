import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Conta({ navigation }) {
    
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
    
    return (
        <View style={styles.backgroundUser}>
            <Text style={{fontSize: 20}}>USER: JOÃO VICTOR</Text>
            <View style={styles.endereco}>
                <Text>rua, nº - bairro, cidade</Text>
                <Text>example@gmail.com</Text>
                <Text>telefone: 99999999999</Text>
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
                <TouchableOpacity style={styles.buttons} onPress={() => {navigation.navigate("Login")}}>
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>SAIR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}