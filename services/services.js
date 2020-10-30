const MongoLib = require("../lib/lib-mongo")

class MoviesServices{
    constructor(){
        this.collection = "movies"
        this.mongoDB = new MongoLib()
    }
    async getMovies({tags}){
        const query = tags && {tags: {$in: tags}}
        const movies = await this.mongoDB.getAll(this.collection, query)
        return movies || []
    }
    async getMovie({movieId}){
        const movie = await this.mongoDB.get(this.collection, movieId)
        return movie || {}
    }
    async createMovie({movie}){
        const createMoviesId = await this.mongoDB.create(this.collection, movie)
        return createMoviesId
    }
    async updateMovie({movieId , movie} = {}){
        const updateMovie = await this.mongoDB.update(this.collection, movieId, movie)
        return updateMovie
    }
    async deletedMovies({movieId}){
        const deletedMoviesID = await this.mongoDB.delete(this.collection, movieId)
        return deletedMoviesId
    }
}

module.exports = MoviesServices