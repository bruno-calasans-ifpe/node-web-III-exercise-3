import express from "express"
import { PORT } from "./config/constants.js"

const app = express()
app.use(express.json())

app.listen(PORT, () => {
  console.log("Server is running")
})
