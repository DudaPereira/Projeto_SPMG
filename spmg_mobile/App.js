import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import login from  './src/screens/pagLogin/login';
import main from './src/screens/main/main';

const AuthStack = createStackNavigator();

export default function Stack() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
      headerMode= 'none'
      >
        <AuthStack.Screen name="login" component={login} />
        <AuthStack.Screen name="main" component={main} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}