const express = require('express')
const lawyers = require('./routes/api/lawyer')
const app = express()
app.use(express.json())
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