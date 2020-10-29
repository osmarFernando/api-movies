
const express = require("express")
const MoviesServices = require('./services')

function moviesApi(app) {
    const router = express.Router()
    app.use("/api/movies", router)

    const moviesServices = new MoviesServices()

    router.get("/", async (req, res, next) => {const {tags} = req.query
        try {
            const movies = await moviesServices.getMovies({tags})
            res.status(200).json({data: movies, mesagge: "movies listed"})
        } catch (err) {
            next(err)}})

    router.get("/:movieId", async (req, res, next) => {
        const {movieId} = req.params
        try {
            const movie = await moviesServices.getMovie({movieId})
            res.status(200).json({data: movie, mesagge: "movie retrived"})
        } catch (err) {
            next(err)
        }
    })

    router.post("/", async (req, res, next) => {
        const {body: movie} = req
        try {
            const createdMovieId = await moviesServices.createMovie({movie})
            res.status(201).json({data: createdMovieId, mesagge: "movie created "})
        } catch (err) {
            next(err)
        }
    })

    router.put("/:movieId", async (req, res, next) => {
        const {body: movie} = req
        const {movieId} = req.params
        try {
            const updateMovieId = await moviesServices.updateMovies({movieId, movie})
            res.status(200).json({data: updateMovieId, mesagge: "movie updated"})
        } catch (err) {
            next(err)
        }
    })
    
    router.delete("/:movieId", async (req, res, next) => {
        const {movieId} = req.params
        try {
            const deleteMovieId = await moviesServices.deletedMovies({movieId})
            res.status(200).json({data: deleteMovieId, mesagge: "movie deleted"})
        } catch (err) {
            next(err)
        }
    })
}

module.exports = moviesApi
