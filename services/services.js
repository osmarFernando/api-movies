const MongoLib = require("../lib/lib-mongo")
const uuid = require("uuid")

class MoviesServices{
    constructor(){
        this.collection = "movie"
        this.mongoDB = new MongoLib()
    }
    async getMovies(){
        const movies = await this.mongoDB.getAll(this.collection)
        return movies || []
    }
    async getMovie({movieId}){
        const movie = await this.mongoDB.get(this.collection, movieId)
        return movie
    }
    async createMovie({movie}){
        const createMovieId = await this.mongoDB.create(this.collection, movie)
        return createMovieId
    }
    async updateMovie({movieId, movie} = {}){
        console.log(movie)
        const updateMovie = await this.mongoDB.update(this.collection, movieId ,movie)
        return updateMovie
    }
    async deletedMovies({movieId}){
        const deletedMoviesId = await this.mongoDB.delete(this.collection, movieId)
        return deletedMoviesId
    }
}

module.exports = MoviesServices