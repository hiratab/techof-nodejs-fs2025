// Arquivo de configuração simplificado do Knex
// Ajuste os dados de conexão com o seu MySQL (host, user, password, database)
export default {
  development: {
    client: "mysql2",
    connection: {
      host: "mysql-techof.alwaysdata.net",
      user: "SEU_USUARIO",
      password: "SUA_SENHA",
      database: "techof_NOME_DO_ALUNO"
    },
    migrations: {
      directory: "./migrations"
    }
  }
};
