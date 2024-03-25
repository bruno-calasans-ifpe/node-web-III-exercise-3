import express from "express"
import { PORT } from "./config/constants.js"
import CategoriaRouter from "./routers/Categoria.router.js"
import ClienteRouter from "./routers/Cliente.router.js"
import ProdutoRouter from "./routers/Produto.router.js"

const app = express()
app.use(express.json())

// routers
app.use("/categoria", CategoriaRouter)
app.use("/cliente", ClienteRouter)
app.use("/produto", ProdutoRouter)

app.get("/", (req, res) => {
  res.json("Server is online")
})

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})
