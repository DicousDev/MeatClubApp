import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#F2F2F2'
    },

    backgroundLogin: {
        paddingVertical: 50,
        paddingHorizontal: 30,
        width: '100%',
    },

    campoEmail: {
        marginVertical: 20,
    },

    emailInput: {
        backgroundColor: '#E9E9E9',
        borderRadius: 5
    },

    emailText: {
        color: '#676767',
        marginBottom: 5
    },

    campoSenha: {
        marginBottom: 30
    },

    senhaInput: {
        backgroundColor: '#E9E9E9',
        borderRadius: 5,
    },

    senhaText: {
        color: '#676767',
        marginBottom: 5
    },

    logar: {
        backgroundColor: '#A10202',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 20
    },

    logarText: {
        color: 'white',
        fontSize: 20
    },

    cadastroText: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 20
    }
});

export default styles;