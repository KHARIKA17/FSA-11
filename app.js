const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Welcome to Location based Gaming Application.')
})
app.get('/about', (req, res) => {
    res.send(' Displays the about page of the app. ')
  })
app.get('/contact', (req, res) => {
    res.send(' Displays the contact page of the app. ')
  })
app.get('/help', (req, res) => {
    res.send(' Displays the help page of the app. ')
  })
app.get('/help/:topic', (req, res) => {
    res.send(` How can I help you with this ${req.params.topic}. `)
  })
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
