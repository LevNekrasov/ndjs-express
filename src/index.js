const express = require('express');
const { v4: uuid } = require('uuid');

class Book {
  constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uuid()) {
    this.id = id
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
  }
}

const library = {
  books: [
    new Book(title = 'ggg'),
    new Book()
  ]
}

const app = express()
app.use(express.json())

app.post('/api/user/login', (req, res) => {
  const user = {id: 1, mail: "test@mail.ru"}
  res.status(201)
  res.json(user)
})

app.get('/api/books', (req, res) => {
  const {books} = library
  res.json(books)
})

app.get('/api/books/:id', (req, res) => {
  const {books} = library
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)

  if( idx !== -1) {
    res.json(books[idx])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

app.post('/api/books', (req, res) => {
  const {books} = library
  const {title, description, authors, favorite, fileCover, fileName} = req.body

  const newBooks = new Book(title, description, authors, favorite, fileCover, fileName)
  books.push(newBooks)

  res.status(201)
  res.json(newBooks)
})

app.put('/api/books/:id', (req, res) => {
  const {books} = library
  const {title, description, authors, favorite, fileCover, fileName} = req.body
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)

  if (idx !== -1){
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    }
    res.json(books[idx])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

app.delete('/api/books/:id', (req, res) => {
  const {books} = library
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)

  if(idx !== -1){
    books.splice(idx, 1)
    res.json('ok')
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT)

console.log(library)