const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const {router} = require('./api/index')


const PORT = 4000
const app = express()
app.use(cors())
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use('/', router)
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
