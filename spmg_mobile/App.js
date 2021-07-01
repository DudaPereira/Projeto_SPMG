import React, {Component} from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import api from './src/services/api';

export default class App extends Component{
constructor(props){
  super(props);
  this.state = {
    listaPaciente: []
  }
}

buscarConsultas = async  () => {
  const resposta = await api.get('/paciente-consulta')
  const dadosDaApi = resposta.data;
  this.setState({listaPaciente : dadosDaApi})
}

componentDidMount () {
  this.buscarConsultas();
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
             keyExtractor={item => item.MedicoNavigation.nomeMedico}
             renderItem={this.renderItem}
          />
        </View>

      </View>
    )
  }

  renderItem = ({item}) => (
    <Text style={{fontSize: 20, color: 'red'}}>{item.MedicoNavigation.nomeMedico}</Text>
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
  }
});
