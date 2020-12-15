
const express = require("express")
const MoviesServices = require("../services/services")

function moviesApi(app) {
    const router = express.Router()
    app.use("/api/movies", router)

    const moviesServices = new MoviesServices()
    router.get("/", async (req, res, next) => {
        try { 
            console.log("hello")
            const movies = await moviesServices.getMovies()
            for(let item of movies){
                delete item._id
            }
            res.status(200).json({data: movies, mesagge: "movies listed"})
        } catch (err) {
            next(err)}})

    router.get("/:movieId", async (req, res, next) => {
        const {movieId} = req.params
        try {
            const movie = await moviesServices.getMovie({movieId})
            if(movie === null) return res.status(404).json({mesagge: "Movie not found"})
            delete movie._id
            return res.status(200).json({data: movie, mesagge: "movie retrived"})
        } catch (err) {
            next(err)
        }
    })

    router.post("/", async (req, res, next) => {
        try {
            const {body: movie} = req
            const movies = await moviesServices.getMovies()
            let exist = false
            for(let item of movies){
                if(movie.title === item.data.title){
                    exist = true
                }               
            }
            if(exist === true){
                return res.status(400).json({messag: "The movie is already exist"})
            }
            const createdMovieId = await moviesServices.createMovie({movie})
            return res.status(201).json({data: createdMovieId.result.nModified,mesagge: "movie created "})
            
        } catch (err) {
            next(err)
        }
    })

    router.put("/", async (req, res, next) => {

        try {
            const { title, movieId } = req.body
            const updateMovieId = await moviesServices.updateMovie({ movieId, movie: {title}})
            return res.status(200).json({data: updateMovieId.result.nModified, mesagge: "movie updated"}) 
        } catch (err) {
            next(err)
        }
    })
    
    router.delete("/:movieId", async (req, res, next) => {
        try {
        const {movieId} = req.params
                 const deleteMovieId = await moviesServices.deletedMovies({movieId}) 
                 return res.status(200).json({data: deleteMovieId.result.nModified , mesagge: "movie deleted"})
        } catch (err) {
            next(err)
        }
    })
}

module.exports = moviesApi