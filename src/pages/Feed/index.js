import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Produto from "../Produto/index"

export default function Feed() {
    
    const styles = StyleSheet.create({
        planos: {
            width: '100%',
            height: '100%',
        },
    });

    return(
        <View style={{marginBottom: 20}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View style={styles.planos}>
                    <Produto/>
                    <Produto/>
                    <Produto/>
                    <Produto/>
                    <Produto/>
                    <Produto/>
                    <Produto/>
                    <Produto/>
                    <Produto/>
                    <Produto/>
                    <Produto/>
                    <Produto/>
                    <Produto/>
                </View>
            </ScrollView>
        </View>
    );
}