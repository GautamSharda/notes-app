const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Note = require('./models/note')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const url = process.env.MONGODB_URI

console.log('connecting to', url)

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

  app.get('/', (request, response) => {
      response.send(notes)
  })

  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })  
  })

  app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
      response.json(note)
    })
  })

  app.delete('/api/notes/:id', (request, response) => {
      const id = Number(request.params.id)
      notes = notes.filter(note => note.id !== id)
      console.log(notes)

      response.status(204).end()
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
  
    note.save().then(savedNote => {
      response.json(savedNote)
    })
  })
  
  app.put('/api/notes/:id', (request, response) => {
    
    for (i = 0; i < notes.length; i++){
        if (notes[i].id === Number(request.body.id)){
            notes[i] = request.body
            console.log(notes[i])
        }
    }
    response.json(request.body)
})

const PORT = process.env.PORT || 3002

  app.listen(PORT, () =>{
      console.log(`Server running on port ${PORT}`)
  })