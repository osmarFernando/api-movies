const express = require("express")
const app = express()

const {config} = require("./config/config")
const moviesApi = require("./routes/routes")
app.use(express.json())
app.use("/api/movies", router)

moviesApi(app)

//app.listen(config.port, () => console.log(`listened in port: ${config.port}`),
//console.log(config.enviroment))

app.listen(config.port, () => {
    console.log(config.enviroment)
    console.log(`listened in port: ${config.port}`)
})
