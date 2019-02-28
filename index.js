const express = require('express')

const companies = require('./routes/api/Company')
//const books = require('./routes/api/Manager')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to GAFI</h1>
    <a href="/api/company">Companies</a>
    `);
})

// Direct routes to appropriate files 
app.use('/api/company', companies)
//app.use('/api/books', books)

// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })

const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))

