import { Sequelize } from 'sequelize';

// Cria a conexão com PostgreSQL
const sequelize = new Sequelize(
  process.env.PGDATABASE, // nome do banco
  process.env.PGUSER,     // usuário
  process.env.PGPASSWORD, // senha
  {
    host: process.env.PGHOST,
    port: process.env.PGPORT || 5432,
    dialect: 'postgres',
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
  .then(() => console.log('✅ Conectado ao PostgreSQL com Sequelize!'))
  .catch(err => console.error('❌ Erro ao conectar no PostgreSQL:', err));

export default sequelize;
