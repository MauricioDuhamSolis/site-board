require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')
const user = require('./handlers/user/index')
const path = require('path')


const port = process.env.PORT || 4000
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
// app.get('/', (req, res) => res.send('hello world'))
app.use('/api/auth', routes.auth)
app.use('/api/user', user.router)
app.use('/api/poll', routes.poll)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, console.log(`Server is running on ${port}`))
