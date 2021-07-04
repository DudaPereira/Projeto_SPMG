import React, {Component} from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';

export default class paciente extends Component{
constructor(props){
  super(props);
  this.state = {
    listaPaciente: []
  }
}

buscarConsultas = async () => {

  const valorToken = await AsyncStorage.getItem('userToken')

  const resposta = await api.get('/paciente-consulta', {
    headers : {
      'Authorization' : 'Bearer ' + valorToken
    }
  })
  const dadosDaApi = resposta.data
  this.setState({ listaPaciente : dadosDaApi })
}

componentDidMount(){
  this.buscarConsultas()
}


  render() {
    return (
      <View style={styles.main}>

        {/* cabeçalho */}
        <View style={styles.mainHeader}>
          <View style={styles.mainHeaderRow}>
            <Text style={styles.mainHeaderText}>{"Consultas".toUpperCase()}</Text>
          </View>
          <View style={styles.mainHeaderLine}/>
        </View> 

        {/* Corpo - Body - Section */}
        <View style={styles.mainBody}>
          <FlatList
             contentContainerStyle={styles.mainBodyContent}
             data={this.state.listaPaciente}
             keyExtractor={item => item.idConsulta}
             renderItem={this.renderItem}
          />
        </View>

      </View>
    )
  }

  renderItem = ({item}) => (
    // <Text style={{fontSize: 20, color: 'red'}}>{item.MedicoNavigation.nomeMedico}</Text>
    <View style={styles.flatItemRow}>
      <View style={styles.flatItemContainer}>
        <Text style={styles.flatItemTitle}>Médico: {item.idMedicoNavigation.nomeMedico}</Text>
        <Text style={styles.flatItemInfo}>Especialidade Médico: {item.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</Text>
        <Text style={styles.flatItemInfo}>Paciente: {item.idPacienteNavigation.nomePaciente}</Text>
        <Text style={styles.flatItemInfo}>Data Consulta: {""} {Intl.DateTimeFormat("pt-BR").format(new Date(item.dataConsulta))}</Text>
        <Text style={styles.flatItemInfo}>Hora Consulta: {""}</Text>
        <Text style={styles.flatItemInfo}>Situação da Consulta: {item.idSituacaoNavigation.situacao1}</Text>
        <Text style={styles.flatItemInfo}>Descrição: {item.descricao}</Text>
      </View>
    </View>
  )

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