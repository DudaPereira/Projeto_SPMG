import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default class login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            senha: ''
        }
    }

    realizarLogin = () => {
        this.props.navigation.navigate('main')
    }

  render() {
    return (
      <View style={styles.main}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress= {this.realizarLogin}
          >
          <Text>Login</Text>
          </TouchableOpacity>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center'
  },

  btnLogin: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 38,
      width: 240,
      backgroundColor: '#7EB9DB',
      borderColor: '#FFF',
      bordertWidth: 1,
      borderRadius: 5,
      shadowOffset: {height: 1, width: 1}
  }
});