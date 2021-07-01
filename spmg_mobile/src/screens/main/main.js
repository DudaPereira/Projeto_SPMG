import React, {Component} from 'react';
import {StyleSheet, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import paciente from '../PagPaciente/paciente';
import medico from '../PagMedico/medico';
import perfil from '../Perfil/perfil';

const bottomTab = createBottomTabNavigator();

export default class main extends Component{

  render() {
    return (
      <View style={styles.main}>
          <bottomTab.Navigator
             initialRouteName= 'perfil'
             tabBarOptions= {{
               showLabel : true,
               showIcon: true,
               activeTintColor:  '#7EB9DB',
               inactiveTintColor: 'black',
               inactiveBackgroundColor: '#7EB9DB',
               style: {height : 50}
             }}
             screenOptions = {({route}) => ({
               tabBarIcon : () => {
                 if (route.name === 'perfil') {
                   return(
                     <Image
                        source={require('../../../assets/img/User.png')}
                        style={styles.tabBarIcon}
                     />
                   )
                 }

                 if(route.name === 'paciente'){
                   return(
                     <Image
                        source={require('../../../assets/img/Calendar.png')}
                        style={styles.tabBarIcon}
                     />
                   )
                 }

                 if(route.name === 'medico'){
                   return(
                     <Image
                        source={require('.../../../assets/img/Notebook.png')}
                        style={styles.tabBarIcon}
                     />
                   )
                 }
               }
             })}
          >
            <bottomTab.Screen name='paciente' component={paciente}/>
            <bottomTab.Screen name='medico' component={medico}/>
            <bottomTab.Screen name='perfil' component={perfil}/>
          </bottomTab.Navigator>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f1f1f1', 
  },

  tabBarIcon: {
    width: 26,
    height: 26
  }
});