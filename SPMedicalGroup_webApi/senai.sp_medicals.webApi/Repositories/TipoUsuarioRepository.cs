using senai.sp_medicals.webApi.Contexts;
using senai.sp_medicals.webApi.Controllers;
using senai.sp_medicals.webApi.Domains;
using System.Collections.Generic;
using System.Linq;

/// <summary>
/// Classe responsável pelo repositório das especialidades
/// </summary>
namespace senai.sp_medicals.webApi.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        /// <summary>
        /// Objeto contexto por onde serão chamados os metódos do EF Core
        /// </summary>
        MedicalsContext ctx = new MedicalsContext();

        /// <summary>
        /// Atualiza um tipo de usuário existente
        /// </summary>
        /// <param name="id">ID dao tipo usuário que será atualizada</param>
        /// <param name="tipoUsuarioAtualizado">Objeto tipoUsuarioAtualizado com as novas informações</param>
        public void AtualizarPorId(int id, TipoUsuario tipoUsuarioAtualizado)
        {
           TipoUsuario tipoUsuarioBuscada = ctx.TipoUsuarios.Find(id);

           if (tipoUsuarioAtualizado.TituloTipoUsuario != null)
           {
               tipoUsuarioBuscada.TituloTipoUsuario = tipoUsuarioAtualizado.TituloTipoUsuario;
           }

           ctx.Update(tipoUsuarioBuscada);

           ctx.SaveChanges();
        }

        /// <summary>
        /// Busca um tipo de usuário pelo seu id
        /// </summary>
        /// <param name="id">Id do tipo de usuário que será buscado</param>
        /// <returns>Um tipo de usuário buscada</returns>
        public TipoUsuario BuscarPorId(int id)
        {
            return ctx.TipoUsuarios.FirstOrDefault(u => u.IdTipoUsuario == id);
        }

        /// <summary>
        /// Cadastra um tipo de usuário 
        /// </summary>
        /// <param name="novoTipoUsuario">Objeto novoTipoUsuario que será cadastrado</param>
        public void Cadastrar(TipoUsuario novoTipoUsuario)
        {
            ctx.TipoUsuarios.Add(novoTipoUsuario);

            ctx.SaveChanges();
        }

        /// <summary>
        /// Deleta um tipo de usuário existente
        /// </summary>
        /// <param name="id">ID do tipo usuário que será deletado</param>
        public void Deletar(int id)
        {
            TipoUsuario tipoUsuarioBuscado = ctx.TipoUsuarios.FirstOrDefault(u => u.IdTipoUsuario == id);

            ctx.TipoUsuarios.Remove(tipoUsuarioBuscado);

            ctx.SaveChanges();
        }

        /// <summary>
        /// Retorna uma lista de tipos de usuários
        /// </summary>
        /// <returns>Uma lista de tipos de usuários</returns>
        public List<TipoUsuario> Listar()
        {
            return ctx.TipoUsuarios.ToList();
        }
    }
}
