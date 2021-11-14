import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Carrinho({ navigation }) {

    const styles = StyleSheet.create({
        assinaturas: {
            marginTop: 20,
            backgroundColor: '#9F3E3E',
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 10
        }
    });

    function planos() {
        navigation.navigate("Feed");
    }

    return (
        <View>
            <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: '80%'}}>
                <Text style={{color: 'black', fontSize: 20}}>O CARRINHO AINDA ESTÁ VAZIO</Text>
                <TouchableOpacity style={styles.assinaturas} onPress={() => {planos()}}>
                    <Text style={{color: 'white'}}>VER ASSINATURAS</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}