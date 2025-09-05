// models/Usuario.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js"; // arquivo de conexão Sequelize

const Usuario = sequelize.define("Usuario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false, // obrigatório
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,     // e-mail deve ser único
    validate: { // pra verificar se realmente é um email. Se tem o @ etc.
      isEmail: true,  // valida formato de e-mail
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  codigoVerificacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  codigoExpiraEm: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: "usuarios", 
  timestamps: false,     // sem createdAt/updatedAt
});

export default Usuario;
