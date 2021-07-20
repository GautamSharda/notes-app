const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://Gautam:${password}@cluster0.qplfe.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note0 = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

const note1 = new Note({
  content: 'Mongoose makes use of mongo easy',
  date: new Date(),
  important: true,
})

const note2 = new Note({
  content: 'Call-back functions suck',
  date: new Date(),
  important: true,
})

note0.save().then(result => {
  console.log('note saved!')
})

note1.save().then(result => {
  console.log('note saved!')
})

note2.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})