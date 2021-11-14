/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthContext from "./src/Context/AuthContext";

import Login from "./src/pages/Login";
import Cadastro from "./src/pages/Cadastro";
import Home from "./src/pages/Home";
import AlterarSenha from "./src/pages/AlterarSenha";
import AlterarEndereco from "./src/pages/AlterarEndereco";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthContext>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Alterar senha"
            component={AlterarSenha}
          />
          <Stack.Screen
            name="Alterar endereço"
            component={AlterarEndereco}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext>
  );
};

export default App;