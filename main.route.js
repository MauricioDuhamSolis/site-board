const express = require('express')
const {MongoClient, ObjectId, ServerApiVersion} = require('mongodb')


const URL = 'mongodb+srv://Prom:sDMaD4cDMuuIRCLt@cluster0.mad4eco.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

const mainRoute = express.Router()
module.exports.mainRoute = mainRoute

client.connect((connErr) => {
  if (connErr) {
    client.close()
    throw connErr
  }

  console.log('MongoDB connected')

  // This help convert the id from string to ObjectId for the _id
  const objectId = ObjectId
  const mainCollection = client.db('siteboard').collection('main')

  // This section will help you get a list of all the main
  mainRoute.route('/').get((req, res) => {
    mainCollection.find({}).toArray((err, result) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
  })

  // This section will help you get a single product by id
  mainRoute.route('/:id').get((req, res) => {
    const myQuery = {_id: objectId(req.params.id)}
    mainCollection.findOne(myQuery, (err, result) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
  })

  // This section will help you create a new product
  mainRoute.route('/add').post((req, response) => {
    mainCollection.insertOne(req.body, (err, res) => {
      if (err) {
        throw err
      }
      response.json(res)
    })
  })

  // This section will help you update a product by id
  mainRoute.route('/update/:id').post((req, response) => {
    const myQuery = {_id: objectId(req.params.id)}
    const newValues = {
      $set: req.body,
    }
    mainCollection.updateOne(myQuery, newValues, (err, res) => {
      if (err) {
        throw err
      }
      response.json(res)
    })
  })

  // This section will help you delete a product
  mainRoute.route('/remove/:id').post((req, response) => {
    const myQuery = {_id: objectId(req.params.id)}
    mainCollection.deleteOne(myQuery, (err, obj) => {
      if (err) {
        throw err
      }
      response.json(obj)
    })
  })

  // This section will help you get product list by username
  mainRoute.route('/getuserdata/:username').get((req, res) => {
    mainCollection.find({username: req.params.username}).toArray((err, result) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
  })
})
