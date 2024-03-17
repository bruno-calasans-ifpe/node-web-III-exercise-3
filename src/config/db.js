import { Sequelize } from "sequelize"
import { DATABASE_URL } from "./constants"

const db = new Sequelize(DATABASE_URL, {
  define: {
    timestamps: true,
    charset: "utf8",
    dialectOptions: {
      collate: "utf8_general_ci",
    },
    freezeTableName: true,
  },
  sync: {
    force: true,
  },
})

try {
  await db.authenticate()
  console.log("Connection has been established successfully.")
} catch (error) {
  console.error("Unable to connect to the database:", error)
}

export default db
