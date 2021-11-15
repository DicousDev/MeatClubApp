import React, { Button, Text }from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EnderecoContext from "../../Context/EnderecoContext";
import ProdutoContext from "../../Context/ProdutosContext";

import Feed from "../Feed";
import Conta from "../Conta";
import Carrinho from "../Carrinho";

export default function Home() {
    const Tab = createBottomTabNavigator();

    return (
        <EnderecoContext>
            <ProdutoContext>
                <Tab.Navigator initialRouteName="Feed"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            
                            let iconName = "";

                            switch(route.name) {
                                case "Feed":
                                    iconName = "home";
                                    break;
                                case "Conta":
                                    iconName = "user";
                                    break;
                                case "Carrinho":
                                    iconName = "shoppingcart";
                                    break;
                                default:
                                    iconName = "circle";
                                    break;
                            }

                            return <AntDesign name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: "#A10202",
                        inactiveTintColor: "#565656"
                    }}>
                    <Tab.Screen 
                        name="Feed"
                        component={Feed}
                    />
                    <Tab.Screen
                        name="Conta"
                        component={Conta}
                    />
                    <Tab.Screen
                        name="Carrinho"
                        component={Carrinho}
                    />
                </Tab.Navigator>
            </ProdutoContext>
        </EnderecoContext>
    );
}