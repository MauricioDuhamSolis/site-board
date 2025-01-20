const express = require('express')
const {MongoClient, ServerApiVersion} = require('mongodb')
const user = require('./user')


const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

const router = express.Router()
module.exports.router = router

client.connect((connErr) => {
  if (connErr) {
    client.close()
    throw connErr
  }

  console.log('===== MongoDB connected =====')
  router.use('/', user.initRouter(client))
})
