import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api' 
 
export default class login extends Component{
    constructor(props){
        super(props);
        this.state = { 
            email: '',
            senha: ''
        }
    }

    realizarLogin = async () => {

      console.warn(this.state.email + '' + this.state.senha);

      const resposta = await api.post('/login' , {
        email : this.state.email,
        senha : this.state.senha,
    });

    const token = resposta.data.token;

    await AsyncStorage.setItem('userToken', token);
            
    console.warn(token);
      
    this.props.navigation.navigate('main')
  }

  render() {
    return (
      <View style={styles.main}>

          <Image
             source={require('../../../assets/img/Logo2.png')}
             style={styles.mainImgLogin}
          />

          <TextInput
             style={styles.inputLogin}
             placeholder='email'
             placeholderTextColor= '#9D9C9C'
             keyboardType= 'email-address' 
             onChangeText={email => this.setState({email})}
          />

          <TextInput
              style={styles.inputLogin}
              placeholder='password'
              placeholderTextColor= '#9D9C9C'
              secureTextEntry={true}
              onChangeText={senha => this.setState({senha})}
          />

          <TouchableOpacity
            style={styles.btnLogin}
            onPress= {this.realizarLogin}
          >
          <Text style={styles.btnLoginText}>Login</Text>
          </TouchableOpacity>

      </View>
    )
  }


}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: 'blue',
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainImgLogin: {
     height: 110,
     width: 110,
     margin: 60,
     marginTop: 0
  },

  inputLogin: {
    width: 240,
    marginBottom: 40,
    fontSize: 18,
    color: '#7EB9DB',
    borderBottomColor: '#7EB9DB', 
    borderBottomWidth: 1
  },

  btnLogin: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 38,
      width: 240,
      backgroundColor: '#7EB9DB',
      borderColor: '#FFF',
      bordertWidth: 1,
      borderRadius: 2,
      shadowOffset: {height: 1, width: 1},
      margin: 20,
  },
  btnLoginText: {
    color: '#fff',
    fontSize: 20,
    // fontFamily: 'Open Sans Light',
    letterSpacing: 3,
    textTransform: 'lowercase'
  }
});