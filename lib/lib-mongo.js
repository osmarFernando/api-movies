const { MongoClient, ObjectId, Db, } = require("mongodb")
const { config } = require("../config/config")
const uuid = require("uuid")


const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = encodeURIComponent(config.dbName)
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`


class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = DB_NAME
    this.movieId = uuid.v4()
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            console.log(err)
            reject(err)
          }
          console.log('Connected succesfully to mongo')
          resolve(this.client.db(this.dbName))
        })
      })
    }
    return MongoLib.connection
  }


  async getAll(collection) {
  
    let db = await this.connect()
    let dbList = await db.collection(collection).find().toArray()
    return dbList

  }

  async get(collection, id) {
    let db = await this.connect()
    let dbList = await db.collection(collection).findOne({ movieId: id })
    return dbList


  }
  async create(collection, data) {
    /*return this.connect().then(db => {
        return db.collection(collection).insertOne({data, movieId: (`${uuid.v4().substr(10)}`).replace(/-/g, '') })})
        .then(result => result.insertedId)*/
    let db = await this.connect()
    let dbList = await db.collection(collection).insertOne({ data, movieId: (`${uuid.v4().substr(10)}`).replace(/-/g, '') })
    return dbList

  }
  async update(collection, id, data) {
    /*return this.connect().then(db => {
        return db.collection(collection).updateOne({movieId: id}, {$set: {data: data}})})
        .then(result => result)*/
    let db = await this.connect()
    let dbList = await db.collection(collection).updateOne({ movieId: id }, { $set: { data: data } })
    return dbList

  }

  async delete(collection, id) {
    /*return this.connect().then(db => {
        return db.collection(collection).deleteOne({movieId: id })}) .then(() => id)*/
    let db = await this.connect()
    let dbList = db.collection(collection).deleteOne({ movieId: id })
    return dbList

  }


}

module.exports = MongoLib