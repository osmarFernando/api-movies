const express = require("express")
const app = express()

const {config} = require("./config")
const moviesApi = require("./routes")
app.use(express.json())

moviesApi(app)

app.listen(config.port, () => console.log(`listened in port: ${config.port}`))