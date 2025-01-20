const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const {mainRoute} = require('./main.route')


const PORT = 4000
const app = express()
app.use(cors())
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use('/main', mainRoute)
app.listen(PORT, () => {
  console.log(`Atlas server is running on port: ${PORT}`)
})
