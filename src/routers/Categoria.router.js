import express from "express"
import db from "../config/db.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const [categorias] = await db.query("select * from categorias")
    res.json(categorias)
  } catch (error) {
    res.status(500).json({ mesage: "Server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const idCategoria = req.params.id

    if (!idCategoria)
      return res.status(403).json("Id da categoria está faltando")

    const [categoria] = await db.query(
      `select * from categorias where id = ${idCategoria}`
    )

    if (categoria.length === 0)
      return res.status(404).json("Categoria não encontrada")

    res.json(categoria)
  } catch (error) {
    res.status(500).json("Server error")
  }
})

router.post("/", async (req, res) => {
  try {
    const { nome, descricao } = req.body
    if (!nome || !descricao) return res.status(403).json("Dados faltando")
    await db.query(
      `insert into categorias (nome, descricao) values ('${nome}', '${descricao}')`
    )
    res.json("Categoria criada com sucesso!")
  } catch (error) {
    res.status(500).json("Server error")
  }
})

router.put("/:id", async (req, res) => {
  try {
    const idCategoria = req.params.id
    const { nome, descricao } = req.body

    if (!idCategoria)
      return res.status(403).json("Id da categoria está faltando")

    const [categoria] = await db.query(
      `select * from categorias where id = ${idCategoria}`
    )
    if (categoria.length == 0)
      return res.status(404).json("Categoria não encontrada")

    await db.query(
      `update categorias set nome = '${nome}', descricao = '${descricao}' where id = '${idCategoria}'`
    )

    res.json("Categoria atualizada com sucesso")
  } catch (error) {
    console.log(error)
    res.status(500).json("Server error")
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const idCategoria = req.params.id

    if (!idCategoria)
      return res.status(403).json("Id da categoria está faltando")

    const [categoria] = await db.query(
      `select * from categorias where id = ${idCategoria}`
    )
    if (categoria.length == 0)
      return res.status(404).json("Categoria não encontrada")

    if (categoria.length == 0)
      return res.status(404).json("Categoria não encontrada")

    await db.query(`delete from categorias where id ='${idCategoria}'`)

    res.json("Categoria deletada com sucesso!")
  } catch (error) {
    res.status(500).json("Server error")
  }
})

export default router
