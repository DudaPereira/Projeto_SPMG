import React, { Component } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import api from "../../services/api";

export default class Medicos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: [],
    };
  }

  buscarConsultas = async () => {
    const valorToken = await AsyncStorage.getItem("userToken");

    let URL = "/consulta/";

    if (jwtDecode(valorToken).role === "2") {
      URL = "/consulta/medico-consulta";

    }else if(jwtDecode(valorToken).role === "3") {
      URL = "/consulta/paciente-consulta";
    }

    const resposta = await api.get(URL, {
      headers: {
        'Authorization': 'Bearer ' + valorToken
      },
    });

    const dadosDaApi = resposta.data;

    this.setState({ listaConsultas: dadosDaApi });
  };

  // buscarPacientes = async () => {
  //   const resposta = await api.get('/consulta/paciente-consulta', {
  //     headers: {
  //       'Authorization' : 'Bearer ' + valorToken
  //     }
  //   })
  //   const dadosDaApi = resposta.data;
  //   this.setState({listaPacientes : dadosDaApi})
  // }

  // buscarMedicos = async () => {
  //   const valorToken = await AsyncStorage.getItem('usuario-login')
  //   const resposta = await api.get('/consulta/medico-consulta', {
  //     headers: {
  //       'Authorization' : 'Bearer ' + valorToken
  //     }
  //   })
  //   const dadosDaApi = resposta.data;
  //   this.setState({listaMedicos : dadosDaApi})
  // }

  componentDidMount() {
    // this.buscarMedicos();
    // this.buscarPacientes();
    this.buscarConsultas();
  }

  render() {
    return (
      <View style={styles.main}>
        {/* header */}
        <View style={styles.mainHeader}>
          <View style={styles.mainHeaderRow}>
            <Text style={styles.mainHeaderText}>
              {"Consultas".toUpperCase()}
            </Text>
          </View>
          <View style={styles.mainHeaderLine} />
          {/* fim header */}

          {/* corpo */}
          <View style={styles.mainBody}>
            <FlatList
              contentContainerStyle={styles.mainBodyContent}
              data={this.state.listaConsultas}
              keyExtractor={(item) => item.descricao}
              renderItem={this.renderItem}
            />
          </View>
          {/* fim corpo */}
        </View>
      </View>
    );
  }

  renderItem = ({ item }) => (
    <View style={styles.flatItemRow}>
      <View style={styles.flatItemContainer}>
        <Text style={styles.flatItemInfo}>Nome do médico: {item.idMedicoNavigation.nomeMedico}</Text>
        <Text style={styles.flatItemInfo}>Especialidade do médico: {item.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</Text>
        <Text style={styles.flatItemTitle}>Nome do paciente: {item.idPacienteNavigation.nomePaciente}</Text>
        <Text style={styles.flatItemInfo}>Data da Consulta:{" "}{Intl.DateTimeFormat("pt-BR").format(new Date(item.dataConsulta))}</Text>
        <Text style={styles.flatItemInfo}>Hora da consulta: {" "}</Text>
        <Text style={styles.flatItemInfo}>Situação: {item.idSituacaoNavigation.situacao1}</Text>
        <Text style={styles.flatItemInfo}>Descrição: {item.descricao}</Text>
      </View>
      <View style={styles.flatItemRow}>
  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#f1f1f1', 
    },
  
    mainHeader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    mainHeaderText: {
      fontSize: 20,
      letterSpacing: 5,
      paddingTop: 10,
      color: '#000',
      fontFamily: 'Roboto'
    },
    mainHeaderLine: {
      width: 200, 
      paddingTop: 10,
      borderBottomColor: '#7EB9DB',
      borderBottomWidth: 2
    }, 
  
    mainBody: {
      flex: 4, 
    }, 
    mainBodyContent: {
      paddingTop: 30,
      paddingRight: 50,
      paddingLeft: 50
    }, 
  
    flatItemRow: {
      flexDirection: 'row',
      borderBottomWidth: 2, 
      borderBottomColor: '#7EB9DB', 
      marginTop: 30
    }, 
    flatItemContainer: {
      flex: 1
    }, 
    flatItemTitle: {
      fontSize: 16,
      color: 'black',
      fontFamily: 'Open Sans Light'
    }, 
    flatItemInfo: {
      fontSize: 15,
      color: 'black',
      lineHeight: 20
    }
  });