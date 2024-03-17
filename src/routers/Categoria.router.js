import express from "express"
import Categoria from "../models/Categoria.model.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.findAll({ raw: true })
    res.json(categorias)
  } catch (error) {
    console.log(error)
    res.status(500).json("Server error")
  }
})

router.get("/:id", async (req, res) => {
  try {
    const idCategoria = req.params.id

    if (!idCategoria)
      return res.status(403).json("Id da categoria está faltando")

    const categoria = await Categoria.findByPk(idCategoria)
    if (!categoria) return res.status(404).json("Categoria não encontrada")

    res.json(categoria)
  } catch (error) {
    res.status(500).json("Server error")
  }
})

router.post("/", async (req, res) => {
  try {
    const { nome, descricao } = req.body
    if (!nome || !descricao) return res.status(403).json("Dados faltando")

    const categoria = await Categoria.create({ nome, descricao })
    res.json(categoria)
  } catch (error) {
    res.status(500).json("Server error")
  }
})

router.put("/:id", async (req, res) => {
  try {
    const idCategoria = req.params.id
    const categoriaDado = req.body

    if (!idCategoria)
      return res.status(403).json("Id da categoria está faltando")

    const categoria = await Categoria.findByPk(idCategoria)
    if (!categoria) return res.status(404).json("Categoria não encontrada")

    await categoria.update(categoriaDado)
    res.json(categoria)
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

    const categoria = await Categoria.findByPk(idCategoria)
    if (!categoria) return res.status(404).json("Categoria não encontrada")

    await categoria.destroy()
    res.json("Categoria deletada")
  } catch (error) {
    console.log(error.name)
    res.status(500).json("Server error")
  }
})

export default router
