import http from 'http'
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { connectDatabase } from './common/connectDB'
// Routes
import mongoose from 'mongoose'

const Schema = mongoose.Schema
require('dotenv').config()

// Setup server express
const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(cookieParser())

const genSchemaModel = (name, schema) => {
  let schemaObject = null
  if (schema) {
    schemaObject = {}
    schema.map(item => {
      schemaObject[item.key] = item.type
    })
  }

  const schemaModel = new Schema(schemaObject || { name: String })

  try {
    mongoose.deleteModel(name)
  } catch (error) {
    console.log('Not define model')
  }

  const Model = mongoose.model(name, schemaModel)
  return Model
}

app.get('/api/:name', async (req, res) => {
  const { name } = req.params

  const model = genSchemaModel(name)

  const dataResult = await model.find()
  res.json(dataResult)
})

app.post('/api/', async (req, res) => {
  const { name, schema, data } = req.body

  const model = genSchemaModel(name, schema)

  const dataResult = await model.create(data)
  res.json(dataResult)
})

app.put('/api/', async (req, res) => {
  const { name, schema, id, data } = req.body

  const model = genSchemaModel(name, schema)
  const dataResult = await model.findOneAndUpdate({ _id: id }, data)
  res.json(dataResult)
})

const server = http.createServer(app)

// Database connection
connectDatabase()

server.listen(process.env.PORT)
console.log('Server started at port ' + process.env.PORT)
