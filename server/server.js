require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, createProperties, getProperties, deleteProperty} = require('./controller.js')

app.use(express.json())
app.use(cors())

//Seed (creating property table)
app.post('/seed', seed)

// Input property
app.post('/input', createProperties)

// Get property list
app.get('/properties', getProperties)

// Delete property
app.delete('/properties/:id', deleteProperty)

app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))