using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using senai.sp_medicals.webApi.Domains;
using senai.sp_medicals.webApi.Repositories;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace senai.sp_medicals.webApi.Controllers
{
  //Define que o tipo de resposta da API será no formato JSON
  [Produces("application/json")]

  //Define que a rota da requisição será no formato dominió/api/nomeController
  //ex: http://localhost:5000/api/consulta
  [Route("api/[controller]")]

  //Define que é um controlador de API
  [ApiController]
  public class ConsultaController : ControllerBase
  {
    private IConsultaRepository _consultaRepository { get; set; }

    public ConsultaController()
    {
      _consultaRepository = new ConsultaRepository();
    }

    /// <summary>
    /// Lista todos as consultas mostrando o médico, paciente e situação (se foi realizada ou não)
    /// </summary>
    /// <returns>Uma lista de consultas</returns>
    [HttpGet("lista")]
    public IActionResult GetConsultas()
    {
        return Ok(_consultaRepository.ListarTudo());
    }
    

    [HttpGet("medico-consulta")]
    public IActionResult GetMedico(int id)
    {
      int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
      var idMedico = _consultaRepository.BuscarIdMedico(idUsuario);

      return Ok(_consultaRepository.ListarConsultasMedico(idMedico));
    }

    
    [HttpGet("paciente-consulta")]
    public IActionResult GetPaciente(int id)
    {
      int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
      var idPaciente = _consultaRepository.BuscarIdPaciente(idUsuario);

      return Ok(_consultaRepository.ListarConsultasPaciente(idPaciente));
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        return Ok(_consultaRepository.BuscarPorId(id));
    }

    //[Authorize(Roles = "1")]
    [HttpPost]
    public IActionResult Post(Consultum novaConsulta)
    {
        _consultaRepository.Cadastrar(novaConsulta);

        return StatusCode(201);
    }

    
    //[Authorize(Roles = "1")]
    [HttpPut("{id}")]
    public IActionResult Put(int id, Consultum consultaAtualizada)
    {
        _consultaRepository.AtualizarPorId(id, consultaAtualizada);

        return StatusCode(204);
    }

    //[Authorize(Roles = "2")]
    [HttpPatch("medico/{id}")]
    public IActionResult PatchDescricao(int id, Consultum Descricao)
    {
        _consultaRepository.MudarDescricao(id, Descricao);
        return StatusCode(204);
    }

  
    
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _consultaRepository.Deletar(id);

        return StatusCode(204);
    }
    }
}