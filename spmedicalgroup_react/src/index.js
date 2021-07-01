// import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Login from './pages/Login/login';
import Administrador from './pages/PagAdm/AdmPag'
import ConsultaMedico from './pages/PagMedico/consultasdomedico'
import ConsultaPaciente from './pages/PagPaciente/consultasdopaciente'

import { parseJwt, usuarioAutenticado } from './services/auth'

import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={props =>
      usuarioAutenticado() && parseJwt().role === "1" ?
        <Component {...props} /> :
        <Redirect to='/' />
    }
  />
);

const PermissaoMedico = ({ component: Component }) => (
  <Route
    render={props =>
      usuarioAutenticado() && parseJwt().role === "2" ?
        <Component {...props} /> :
        <Redirect to='/' />
    }
  />
);

const PermissaoPaciente = ({ component: Component }) => (
  <Route
    render={props =>
      usuarioAutenticado() && parseJwt().role === "3" ?
        <Component {...props} /> :
        <Redirect to='/' />
    }
  />
);


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} /> {/* login */}
        <PermissaoAdm path="/adm" component={Administrador} /> {/* Adm */}
        <PermissaoMedico path="/medico" component={ConsultaMedico} /> {/* consultas do medico  */}
        <PermissaoPaciente path="/consultas" component={ConsultaPaciente} /> {/* consultas do paciente  */}
      </Switch>
    </div>
  </Router>
)



ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
