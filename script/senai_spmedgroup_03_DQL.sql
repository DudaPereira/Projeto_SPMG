use projeto_medicals;

select * from tipoUsuario;
select * from usuario;
select * from paciente;
select * from medico;
select * from consulta;
select * from especialidade;
select * from clinica;
select * from situacao;

--O administrador poderá cadastrar qualquer tipo de usuário (administrador, paciente ou médico)
select idUsuario, tituloTipoUsuario, email from Usuario
inner join tipoUsuario
on Usuario.idTipoUsuario = tipoUsuario.idTipoUsuario;

--O administrador poderá agendar uma consulta, onde será informado o paciente, data do agendamento e qual médico irá atender a consulta (o médico possuirá sua determinada especialidade)
select idConsulta, nomePaciente, dataConsulta, nomeMedico from consulta 
inner join medico
on medico.idMedico = consulta.idConsulta
inner join paciente
on paciente.idPaciente = consulta.idPaciente; 

--O administrador poderá cancelar o agendamento
select tituloTipoUsuario[situacao], email from Usuario
inner join tipoUsuario
on usuario.idTipoUsuario = tipoUsuario.idTipoUsuario
where email = 'adm@adm.com';

--O administrador deverá informar os dados da clínica (como endereço, horário de funcionamento, CNPJ, nome fantasia e razão social)
select idClinica, endereco, CNPJ, nomeFantasia, razaoSocial from clinica;

--O médico poderá ver os agendamentos (consultas) associados a ele
select nomeMedico, nomePaciente, dataConsulta, descricao from consulta 
inner join  medico
on medico.idMedico = consulta.idMedico
inner join paciente
on paciente.idPaciente = consulta.idMedico
WHERE medico.idMedico = 1;

--O médico poderá incluir a descrição da consulta que estará vinculada ao paciente (prontuário)
select nomePaciente, descricao from paciente 
left join consulta
on consulta.idConsulta = paciente.idPaciente;


--O paciente poderá visualizar suas próprias consultas
select nomePaciente, dataConsulta, nomeMedico, descricao from paciente
inner join consulta 
on consulta.idConsulta = paciente.idPaciente
inner join medico 
on medico.idMedico = paciente.idPaciente;

--Converteu a data de nascimento do usuário para o formato (mm-dd-yyyy) na exibição
SELECT nomePaciente AS Nome, CONVERT (VARCHAR, dataNascimento, 101) AS DataNascimento FROM paciente;

--aqui mostra a quantidade de usuários cadastrados;
SELECT COUNT (Usuario.idUsuario) AS QuantidadeDeUsuarios  FROM Usuario;


select nomePaciente, nomeMedico, dataConsulta, nomeEspecialidade as especialidade, situacao, horarioAbertura [HorarioAberturaClinica], horarioFechamento[HorarioFechamentoClinica], nomeFantasia[nomeClinica] from consulta
inner join medico
on consulta.idMedico = medico.idMedico
inner join paciente
on consulta.idPaciente = paciente.idPaciente
inner join especialidade
on medico.idEspecialidade = especialidade.idEspecialidade
inner join situacao
on consulta.idSituacao = situacao.idSituacao
inner join clinica
on medico.idClinica = clinica.idClinica;

