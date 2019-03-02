const express = require('express')
const mongoose = require('mongoose')
const lawyers = require('./routes/api/lawyer')


const app = express()


const db = require('./config/keys').mongoURI


mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))




app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Homepage/h1>
    <a href="/api/lawyer">Lawyers</a>
    `);
})

// Direct routes to appropriate files 
app.use('/api/lawyer', lawyers)


// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })

const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
