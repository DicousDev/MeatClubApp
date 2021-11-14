import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Conta() {
    
    const styles = StyleSheet.create({
        backgroundUser: {
            height: '100%',
            padding: 30,
        }
    });
    
    return (
        <View style={styles.backgroundUser}>
            <Text style={{fontSize: 15}}>USER: JOÃO VICTOR</Text>
            
        </View>
    );
}