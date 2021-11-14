import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#F2F2F2'
    },

    backgroundCadastro: {
        paddingVertical: 50,
        paddingHorizontal: 30,
        width: '100%',
    },

    textoInput: {
        color: '#676767',
        marginBottom: 5
    },

    input: {
        backgroundColor: '#E9E9E9',
        borderRadius: 5
    },

    email: {
        marginBottom: 20
    },

    senha: {
        marginBottom: 20
    },

    confirmaSenha: {
        marginBottom: 20
    },

    cpf: {
        marginBottom: 20
    },

    telefone: {
        marginBottom: 20
    },

    endereco: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },

    endereco2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },

    rua: {
        width: 150
    },

    numero: {
        width: 150
    },

    bairro: {
        width: 150
    },

    cidade: {
        width: 150
    },

    campoNomes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },

    nome: {
        width: 150
    },

    sobrenome: {
        width: 150
    },

    cadastro: {
        backgroundColor: '#A10202',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 20
    }
});

export default styles;