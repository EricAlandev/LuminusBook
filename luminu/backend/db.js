import { Sequelize } from 'sequelize';

// Cria a conexão com PostgreSQL
const sequelize = new Sequelize(
  process.env.DATABASE, // nome do banco
  process.env.USER,     // usuário
  process.env.PASSWORD, // senha
  {
    host: process.env.HOST,
    port: process.env.PORT || 5432,
    dialect: 'mysql',
    logging: false, // desativa logs SQL no console
    pool: {
      max: 10,       // máximo de conexões
      min: 0,
      acquire: 60000, // tempo máximo para adquirir conexão
      idle: 60000     // tempo máximo ocioso da conexão
    },
  }
);

// Testar conexão
sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao MySQL  com Sequelize!'))
  .catch(err => console.error('❌ Erro ao conectar no PostgreSQL:', err));

export default sequelize;
