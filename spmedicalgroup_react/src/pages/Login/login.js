import React, { Component } from 'react'
import axios from 'axios'
import { parseJwt} from '../../services/auth'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      erroMensagem: '',
      isLoading: false
    }
  };

  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value })
  }

  efetuaLogin = (event) => {
    event.preventDefault();

    this.setState({ erroMensagem: '', isLoading: true })

    axios.post('http://localhost:5000/api/Login', {
      email: this.state.email,
      senha: this.state.senha
    })

      .then(resposta => {
        if (resposta.status === 200) {
          localStorage.setItem('usuario-login', resposta.data.token)

          // console.log('meu token é: ' + resposta.data.token)
          this.setState({ isLoading: false })

          console.log(parseJwt().role);

          switch (parseJwt().role) {
            case "1":
              this.props.history.push('/adm')
              break;
            case "2":
              this.props.history.push('/medico')
              break;
            case "3":
              this.props.history.push('/consultas')
              break;
            default:
              this.props.history.push('/')
              break;
          }
        }
      })

      .catch(() => {
        this.setState({ erroMensagem: 'E-mail ou senha incorretos!', isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <main>
          <section>
            <p>Bem vindo (a)! <br /> Faça login para acessar sua conta! </p>

            <form onSubmit={this.efetuaLogin}>
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.atualizaStateCampo}
                placeholder="Email"
              />

              <input
                type="password"
                name="senha"
                value={this.state.senha}
                onChange={this.atualizaStateCampo}
                placeholder="Senha"
              />

              <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>

              {
                this.state.isLoading === true &&
                <button type="submit" disabled>Loading</button>
              }
              {
                this.state.isLoading === false &&
                <button
                  type="submit"
                  disabled={this.state.email === '' || this.state.section === '' ? 'none' : ''}
                >
                  Logar
                  </button>
              }

              {/* <button type="submit">Logar</button> */}

            </form>
          </section>
        </main>
      </div >
    )
  }
}

export default Login;
