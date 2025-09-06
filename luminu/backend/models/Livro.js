// models/Livro.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js"; // arquivo de conexão Sequelize

const Livro = sequelize.define("Livro", {
  livroNome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  livroURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avaliacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avaliacaoURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publicacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  editora: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resumo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ordemLivros: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dowload: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: "livros",       
  freezeTableName: true,     
  timestamps: false          
});

export default Livro;
