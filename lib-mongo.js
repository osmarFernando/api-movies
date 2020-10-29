const { MongoClient, ObjectId, Db } = require("mongodb")
const { config } = require('./config');


const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName;
const MONGO_URI= `mongodb+srv://db_user_osmar:osmarMolina1@cluster0.hplgd.mongodb.net/test?authSource=admin&replicaSet=atlas-al8329-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
//const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser:true, });
    this.dbName = DB_NAME
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
          console.log(err)
        })
      })
    }
    return MongoLib.connection
  }
  getAll(collection, query) {
    return this.connect().then(db => {
        return db.collection(collection).find(query).toArray()})
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) })});
  }
  create(collection, data) {
    return this.connect().then(db => {
        return db.collection(collection).insertOne(data) }) .then(result => result.insertedId)
  }

  update(collection, id, data) {
    return this.connect().then(db => {
        return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })}).then(result => result.upsertedId || id)
  }

  delete(collection, id) {
    return this.connect().then(db => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) })}) .then(() => id)}
}

module.exports = MongoLib