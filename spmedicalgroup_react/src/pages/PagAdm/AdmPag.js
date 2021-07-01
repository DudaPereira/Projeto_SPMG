import axios from 'axios';
import { Component } from 'react'

class Administrador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: [],
      idConsulta: 0,
      idMedico: 0,
      listaMedico: [],
      idPaciente: 0,
      listaPaciente: [],
      situacao: 0,
      listaSituacoes: [],
      dataConsulta: (new Date()).getFullYear(),
      horaConsulta: '',
      descricao: '',
      isLoading: false,
    }
  };

  buscarConsultas = () => {
    axios('http://localhost:5000/api/consulta/lista', {
      // headers: {
      //   'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
      // }
    })

      .then(resposta => {
        if (resposta.status === 200) {
          this.setState({ listaConsultas: resposta.data })
          console.log(this.state.listaConsultas)
        }
      })

      .catch(erro => console.log(erro))
  }
  
  buscarMedicos = () => {
    axios('http://localhost:5000/api/medico')

      .then(resposta => {
        if (resposta.status === 200) {
          this.setState({ listaMedico: resposta.data })
          console.log(this.state.listaMedico)
        }
      })

      .catch(erro => console.log(erro))
  }

  buscarPacientes = () => {
    axios('http://localhost:5000/api/paciente')

      .then(resposta => {
        if (resposta.status === 200) {
          this.setState({ listaPaciente: resposta.data })
          console.log(this.state.listaPaciente)
        }
      })
      .catch(erro => console.log(erro))
  }

  buscarSituacoes = () => {
    axios('http://localhost:5000/api/situacao')

      .then(resposta => {
        if (resposta.status === 200) {
          this.setState({ listaSituacoes: resposta.data })
          console.log(this.state.listaSituacoes)
        }
      })

      .catch(erro => console.log(erro))
  }


  componentDidMount() {
    this.buscarConsultas();
    this.buscarMedicos();
    this.buscarPacientes();
    this.buscarSituacoes();
  };

  cadastrarConsulta = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true })

    let consulta = {
      idMedico: this.state.idMedico,
      idPaciente: this.state.idPaciente,
      idSituacao: this.state.situacao,
      dataConsulta: this.state.dataConsulta,
      horaConsulta: this.state.horaConsulta,
      descricao: ''
    }

    console.log(consulta);

    axios.post('http://localhost:5000/api/Consulta', consulta)

    .then(resposta => {
      if (resposta.status === 201) {
        console.log('Consulta cadastrada!')
        this.setState({ isLoading: false })
      }
    })
    .catch(erro => {
      console.log(erro);
      this.setState({ isLoading: false })
    })
}

atualizaStateCampo = async (campo) => {
  await this.setState({ [campo.target.name]: campo.target.value })
  console.log(this.state.situacao)
}

atualizaHora = (event) => { 
  this.setState({horaConsulta : event.target.value}) 
  console.log(this.state.horaConsulta) 
}


  render(){
    return(
        <div>
             <main>
                 <section>
                     {/* lista de consulta de um paciente */}
                     <h2>Lista Consulta</h2>
                     <table style={{ borderCollapse: "separate", borderSpacing: 20 }}>
                         <thead>
                             <tr>
                                 <th>Nome Médico</th>
                                 <th>Especialidade</th>
                                 <th>Nome Paciente</th>
                                 <th>Data da Consulta</th>
                                 <th>Horário da Consulta</th>
                                 <th>Discrição</th>
                                 <th>Situação</th>
                             </tr>
                         </thead>

                         <tbody>
                {
                  this.state.listaConsultas.map((consultas) => {
                    return (
                      <tr key={consultas.idConsulta}>
                        <td>{consultas.idPacienteNavigation.nomePaciente}</td>
                        <td>{Intl.DateTimeFormat("pt-BR").format(new Date(consultas.dataConsulta))}</td>
                        <td>{consultas.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</td>
                        <td>{consultas.descricao}</td>
                        <td>{consultas.idSituacaoNavigation.situacao1}</td>
                        <td>
                        </td>
                      </tr>

                    )
                  })
                }

              </tbody>
                     </table>
                 </section>

                 <section>
                     <h2>Cadastre uma Nova Consulta</h2>
                     <form onSubmit={this.cadastrarConsulta}>
                         <select
                         name="situacao"
                         value={this.state.situacao}
                         onChange={this.atualizaStateCampo}>
                              <option>Selecione a situação a ser realizada</option>
                              <option value="1">Realizada</option>
                              <option value="2">Cancelada</option>
                              <option value="3">Agendada</option>
                         </select>

                         <select
                         name="idMedico"
                         value={this.state.idMedico}
                         onChange={this.atualizaStateCampo}>
                            <option >Medicos</option>
                            {
                            this.state.listaMedico.map(medico => {
                                 return (
                                 <option key={medico.idMedico} value={medico.idMedico}>
                                     {medico.nomeMedico}
                                 </option>
                                 );
                                })
                            }
                         </select>

                         <select
                         name="idPaciente"
                         value={this.state.idPaciente}
                         onChange={this.atualizaStateCampo}>
                             <option >Pacientes</option>
                             {
                             this.state.listaPaciente.map(paciente => {
                                 return (
                                 <option key={paciente.idPaciente} value={paciente.idPaciente}>
                                    {paciente.nomePaciente}
                                </option>
                                );
                            })
                            }
                         </select>

                         <input
                            type="date"
                            name="dataConsulta"
                            value={this.state.dataConsulta}
                            onChange={this.atualizaStateCampo}
                         />

                         <input
                            type= "text"
                            nome="descricao"
                            valeu={this.state.descricao}
                            onChange={this.atualizaStateCampo}
                         />

                         <input
                            type="time"
                            nome="horaConsulta"
                            value={this.state.horaConsulta}
                            onChange={this.atualizaHora}
                         />

                             <button type="submit">Cadastrar</button>
                     </form>
                 </section>
             </main>
        </div>
    )
}
}

export default Administrador;

// import axios from  'axios';
// import { Component } from 'react';

// class Cadastro extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       idConsulta: 0,
//       idMedico: 0,
//       listaMedico: [],
//       idPaciente: 0,
//       listaPaciente: [],
//       situacao: 0,
//       listaSituacoes: [],
//       dataConsulta: (new Date()).getFullYear(),
//       descricao: '',
//       isLoading: false,
//     }
//   };

//   buscarMedicos = () => {
//     axios('http://localhost:5000/api/medico')

//       .then(resposta => {
//         if (resposta.status === 200) {
//           this.setState({ listaMedico: resposta.data })
//           console.log(this.state.listaMedico)
//         }
//       })

//       .catch(erro => console.log(erro))
//   }

//   buscarPacientes = () => {
//     axios('http://localhost:5000/api/paciente')

//       .then(resposta => {
//         if (resposta.status === 200) {
//           this.setState({ listaPaciente: resposta.data })
//           console.log(this.state.listaPaciente)
//         }
//       })
//       .catch(erro => console.log(erro))
//   }

//   buscarSituacoes = () => {
//     axios('http://localhost:5000/api/situacao')

//       .then(resposta => {
//         if (resposta.status === 200) {
//           this.setState({ listaSituacoes: resposta.data })
//           console.log(this.state.listaSituacoes)
//         }
//       })

//       .catch(erro => console.log(erro))
//   }

//   //USAR ESSE QUANDO FIZER O LOGIN
//   // buscarConsultas = () => {
//   //   axios('http://localhost:5000/api/Consulta/lista', {
//   //     headers: {
//   //       'Authorization': 'Bearer' + localStorage.getItem('usuario-login')
//   //     }
//   //   })
//   // }


//   componentDidMount() {
//     this.buscarMedicos();
//     this.buscarPacientes();
//     this.buscarSituacoes();
//   };

//   cadastrarConsulta = (event) => {
//     event.preventDefault();
//     this.setState({ isLoading: true })

//     let consulta = {
//       idMedico: this.state.idMedico,
//       idPaciente: this.state.idPaciente,
//       idSituacao: this.state.situacao,
//       dataConsulta: this.state.dataConsulta,
//       descricao: ''
//     }

//     console.log(consulta);

//     axios.post('http://localhost:5000/api/consulta', consulta)

//       .then(resposta => {
//         if (resposta.status === 201) {
//           console.log('Consulta cadastrada!')
//           this.setState({ isLoading: false })
//         }
//       })
//       .catch(erro => {
//         console.log(erro);
//         this.setState({ isLoading: false })
//       })
//   }

//   atualizaStateCampo = async (campo) => {
//     await this.setState({ [campo.target.name]: campo.target.value })
//     console.log(this.state.situacao)
//   }


//   render() {
//     return (
//       <main>
//         <section>
//           <h2>Cadastroooo</h2>
//           <form onSubmit={this.cadastrarConsulta}>
//             <div style={{ display: 'flex', flexDirection: 'column', width: '20vw' }}>

//               <select
//                 name="situacao"
//                 value={this.state.situacao}
//                 onChange={this.atualizaStateCampo}
//               >

//                 <option>Selecione a situação a ser realizada</option>
//                 <option value="1">Realizada</option>
//                 <option value="2">Cancelada</option>
//                 <option value="3">Agendada</option>
//               </select>

//               <select
//                 name="idMedico"
//                 value={this.state.idMedico}
//                 onChange={this.atualizaStateCampo}
//               >
//                 <option >Medicos</option>
//                 {
//                   this.state.listaMedico.map(consultas => {
//                     return (
//                       <option key={consultas.idMedico} value={consultas.idMedico}>
//                         {consultas.nomeMedico}
//                       </option>
//                     );
//                   })
//                 }
//               </select>

//               <select
//                 name="idPaciente"
//                 value={this.state.idPaciente}
//                 onChange={this.atualizaStateCampo}
//               >
//                 <option >Pacientes</option>
//                 {
//                   this.state.listaPaciente.map(consultas => {
//                     return (
//                       <option key={consultas.idPaciente} value={consultas.idPaciente}>
//                         {consultas.nomePaciente}
//                       </option>
//                     );
//                   })
//                 }
//               </select>


//               <input
//                 type="date"
//                 name="dataConsulta"
//                 value={this.state.dataConsulta}
//                 onChange={this.atualizaStateCampo}
//               />

//               {
//                 // Caso seja true, renderiza um botão desabilitado com o texto 'Loading...'
//                 this.state.isLoading === true &&
//                 <button type="submit" disabled>
//                   Loading...
//               </button>
//               }

//               {
//                 // Caso seja false, renderiza um botão habilitado com o texto 'Cadastrar'
//                 this.state.isLoading === false &&
//                 <button type="submit">
//                   Cadastrar
//                </button>
//               }

//             </div>
//           </form>
//         </section>
//       </main >
//     )
//   }
// }

// export default Cadastro;
