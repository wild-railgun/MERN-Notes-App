require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const notesRoutes = require('./routes/notes')
const userRoutes = require('./routes/user')

// express app
const app = express()
// app.use(cors(
//   {
//     origin: ["https://deploy-mern-lwhq.vercel.app"],
//     methods: ["POST", "GET"],
//     credentials: true
//   }
// ));

// middleware
app.use(express.json())

app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to my notes app'})
})

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/notes', notesRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 