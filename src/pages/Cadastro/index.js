import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import styles from "./styles";

export default function Cadastro() {
    return (
        <View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View style={styles.background}>
                    <View style={styles.backgroundCadastro}>
                        <View style={styles.campoNomes}>
                            <View style={styles.nome}>
                                <Text style={styles.textoInput}>NOME</Text>
                                <TextInput style={styles.input}/>
                            </View>
                            <View style={styles.sobrenome}>
                                <Text style={styles.textoInput}>SOBRENOME</Text>
                                <TextInput style={styles.input}/>
                            </View>
                        </View>

                        <View style={styles.email}>
                            <Text style={styles.textoInput}>EMAIL</Text>
                            <TextInput style={styles.input} placeholder="example@gmail.com"/>
                        </View>

                        <View style={styles.senha}>
                            <Text style={styles.textoInput}>SENHA</Text>
                            <TextInput style={styles.input} placeholder="*********"/>
                        </View>

                        <View style={styles.confirmaSenha}>
                            <Text style={styles.textoInput}>CONFIRMAR SENHA</Text>
                            <TextInput style={styles.input} placeholder="*********"/>
                        </View>

                        <View style={styles.cpf}>
                            <Text style={styles.textoInput}>CPF</Text>
                            <TextInput style={styles.input} placeholder="999.999.999-99"/>
                        </View>

                        <View style={styles.telefone}>
                            <Text style={styles.textoInput}>TELEFONE</Text>
                            <TextInput style={styles.input} placeholder="(99) 9 9999-9999"/>
                        </View>

                        <View style={styles.endereco}>
                            <View style={styles.rua}>
                                <Text style={styles.textoInput}>RUA</Text>
                                <TextInput style={styles.input}/>
                            </View>

                            <View style={styles.numero}>
                                <Text style={styles.textoInput}>NÚMERO</Text>
                                <TextInput style={styles.input}/>
                            </View>
                        </View>
                        <View style={styles.endereco2}>
                            <View style={styles.bairro}>
                                <Text style={styles.textoInput}>BAIRRO</Text>
                                <TextInput style={styles.input}/>
                            </View>
                            <View style={styles.cidade}>
                                <Text style={styles.textoInput}>CIDADE</Text>
                                <TextInput style={styles.input}/>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.cadastro}>
                                <Text style={{color: 'white', fontSize: 20}}>CADASTRAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}