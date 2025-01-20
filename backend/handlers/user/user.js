const express = require('express')
const {ObjectId} = require('mongodb')


module.exports.initRouter = (client) => {
  const router = express.Router()

  // This help convert the id from string to ObjectId for the _id
  const objectId = ObjectId
  const mainCollection = client.db('siteboard').collection('user')

  // This section will help you get a list of all the user
  router.route('/').get((req, res) => {
    mainCollection.find({}).toArray((err, result) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
  })

  // This section will help you get a single product by id
  router.route('/:id').get((req, res) => {
    const myQuery = {_id: objectId(req.params.id)}
    mainCollection.findOne(myQuery, (err, result) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
  })

  // This section will help you create a new product
  router.route('/add').post((req, response) => {
    mainCollection.insertOne(req.body, (err, res) => {
      if (err) {
        throw err
      }
      response.json(res)
    })
  })

  // This section will help you update a product by id
  router.route('/update/:id').post((req, response) => {
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
  router.route('/remove/:id').post((req, response) => {
    const myQuery = {_id: objectId(req.params.id)}
    mainCollection.deleteOne(myQuery, (err, obj) => {
      if (err) {
        throw err
      }
      response.json(obj)
    })
  })

  // This section will help you get product list by username
  router.route('/getuserdata/:username').get((req, res) => {
    mainCollection.find({username: req.params.username}).toArray((err, result) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
  })

  return router
}
