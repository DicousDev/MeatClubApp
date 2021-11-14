import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Produto() {

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

    return (
        <View style={styles.backgroundPlano}>
            <View style={{flex: 1,}}>
                <Text style={{fontSize: 20}}>Plano simples</Text>
                <View style={styles.conteudoPlano}>
                    <Text style={{fontSize: 10}}>1/2 kg de Contrafilé Grill</Text>
                    <Text style={{fontSize: 10}}>1/2 kg de Linguiça Toscana</Text>
                    <Text style={{fontSize: 10}}>1/2 kg de Drumet Molho Mostarda</Text>
                </View>
            </View>
            <View style={{alignItems: "center", justifyContent: 'flex-end', flex: 1}}>
                <Text style={{paddingBottom: 5}}>R$ 99,90 mensal</Text>
                <TouchableOpacity style={{backgroundColor: "#9F3E3E", paddingHorizontal: 40, paddingVertical: 5, borderRadius: 10}}>
                    <Text style={{color: 'white'}}>ADICIONAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}