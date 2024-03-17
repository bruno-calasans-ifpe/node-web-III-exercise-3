import express from "express"
import { PORT } from "./config/constants.js"

app.listen(PORT, () => {
  console.log("Server is running")
})
