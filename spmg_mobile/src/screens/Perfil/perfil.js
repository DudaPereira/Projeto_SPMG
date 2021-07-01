import React, {Component} from 'react';
import {StyleSheet, Text, View } from 'react-native';


export default class perfil extends Component{


  render() {
    return (
      <View style={styles.main}>
          <Text>Perfil</Text>
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
});