const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const {join} = require('path')


const app = express()

const port = process.env.SERVER_PORT || 3000

app.use(morgan('dev'))

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
)

app.use(express.static(join(__dirname, 'dist')))

app.listen(port, () => console.log(`Production server listening on port ${port}`))
