import React, { Component } from 'react';
import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export default class Perfil extends Component {
  constructor(props){
    super(props);
    this.state = {
      // nome : '',
      email : ''
    }
  };

  buscarDadosStorage = async () =>{
    try {
      
      const valorToken = await AsyncStorage.setItem('userToken');
      console.warn(jwtDecode(valorToken))

      if (valorToken !== null) {
        this.setState({email : jwtDecode(valorToken).email})
      }

    } catch (error) {
      console.warn(error)
    }
  }
  realizarLogout = async () => {
    try {
      
      await AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('login');

    } catch (error) {
      console.warn(error)
    }
  };

  componentDidMount() {
    this.buscarDadosStorage();
  }

  render(){
    return (
      <View style={styles.main}>

        {/* Cabeçalho - Header */}
        <View style={styles.mainHeader}>
          <View style={styles.mainHeaderRow}>
            <Text style={styles.mainHeaderText}>{"Perfil".toUpperCase()}</Text>
          </View>
          <View style={styles.mainHeaderLine} />
        </View>

        {/* Corpo - Body - Section */}
        <View style={styles.mainBody}>
          <View style={styles.mainBodyInfo}>
            {/* <Image 
              source={imagem vinda da API}
              style={styles.mainBodyImg}
            /> */}
            <View style={styles.mainBodyImg} />

            <Text style={styles.mainBodyText}>Nome</Text>
            <Text style={styles.mainBodyText}>Email</Text>
          </View>

          <TouchableOpacity
            style={styles.btnLogout}
            onPress={this.realizarLogout}
          >
              <Text style={styles.btnLogoutText}>sair</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({

  // conteúdo da main
  main: {
    flex: 1,
    backgroundColor: '#F1F1F1'
  },
  // cabeçalho
  mainHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainHeaderRow: {
    flexDirection: 'row'
  },
  // texto do cabeçalho
  mainHeaderText: {
    fontSize: 16,
    letterSpacing: 5,
    color: '#999',
    fontFamily: 'Open Sans'
  },
  // linha de separação do cabeçalho
  mainHeaderLine: {
    width: 220,
    paddingTop: 10,
    borderBottomColor: '#7EB9DB',
    borderBottomWidth: 1
  },

  // conteúdo do body
  mainBody: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  // informações do usuário
  mainBodyInfo: {
    alignItems: 'center'
  },
  mainBodyImg: {
    backgroundColor: '#ccc',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 50
  },
  mainBodyText: {
    color: '#999',
    fontSize: 16,
    marginBottom: 20
  },
  // botão de logout
  btnLogout: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 240,
    borderTopWidth: 1,
    borderColor: '#7EB9DB',
    marginBottom: 50
  },
  // texto do botão
  btnLogoutText: {
    fontSize: 16,
    fontFamily: "Open Sans",
    color: '#7EB9DB'
  }

});  