import { DataTypes } from "sequelize"
import db from "../config/db"

const Categoria = db.define("categorias", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
})

export default Categoria
