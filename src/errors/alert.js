import React from "react";
import { View, Text } from "react-native"

export default function Alert(props) {
    return (
        <View style={{width: '100%', backgroundColor: '#fda4af', paddingVertical: 10, display: (props.erro) ? "flex" : "none"}}>
            <Text style={{color: '#f43f5e', textAlign: 'center'}}>{props.erro}</Text>
        </View>
    );
}