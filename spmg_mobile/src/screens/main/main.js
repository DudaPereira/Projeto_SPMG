import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";



import consultas from '../pagConsultas/consultas';
import perfil from '../perfil/perfil';

const bottomTab = createBottomTabNavigator();

export default class main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <bottomTab.Navigator
          initialRouteName="perfil"
          tabBarOptions={{
            showLabel: true,
            showIcon: true,
            activeBackgroundColor: '#7EB9DB',
            activeTintColor: 'black',
            inactiveTintColor: '#7EB9DB',
            style: { height: 50 },
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: () => {
              if (route.name === "consultas") {
                return (
                  <Image
                    source={require("../../../assets/img/Notebook.png")}
                    style={styles.tabBarIcon}
                  />
                );
              }
              if (route.name === "perfil") {
                return (
                  <Image
                    source={require("../../../assets/img/User.png")}
                    style={styles.tabBarIcon}
                  />
                );
              }
            },
          })}
        >
          <bottomTab.Screen name="consultas" component={consultas} />
          <bottomTab.Screen name="perfil" component={perfil} />
        </bottomTab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
  },

  tabBarIcon: {
    width: 26,
    height: 26,
  },
});