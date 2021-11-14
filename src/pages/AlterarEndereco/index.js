import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

export default function AlterarEndereco({ navigation }) {
    
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
        await navigation.navigate("Conta");
        setTimeout(() => {alert("Conta atualizada")}, 100);
    }
    
    return (
        <View style={styles.background}>
            <View style={{width: '100%'}}>
                <Text style={styles.textoInput}>RUA</Text>
                <TextInput style={styles.inputPadrao} placeholder="RUA"></TextInput>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
                <Text style={styles.textoInput}>NÚMERO</Text>
                <TextInput style={styles.inputPadrao} placeholder="NÚMERO"></TextInput>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
                <Text style={styles.textoInput}>BAIRRO</Text>
                <TextInput style={styles.inputPadrao} placeholder="BAIRRO"></TextInput>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
                <Text style={styles.textoInput}>CIDADE</Text>
                <TextInput style={styles.inputPadrao} placeholder="CIDADE"></TextInput>
            </View>
            <TouchableOpacity style={styles.salvar} onPress={() => {salvar()}}>
                <Text style={{textAlign: 'center', color: 'white', paddingVertical: 10}}>SALVAR</Text>
            </TouchableOpacity>
        </View>
    );
}