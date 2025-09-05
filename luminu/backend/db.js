import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

// ✅ Use a URL completa do Railway
const sequelize = new Sequelize(process.env.MYSQL_PUBLIC_URL, {
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 60000,
    idle: 60000
  },
  dialectOptions: {
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
  }
});

sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao MySQL com Sequelize!'))
  .catch(err => console.error('❌ Erro ao conectar no MySQL:', err));

export default sequelize;