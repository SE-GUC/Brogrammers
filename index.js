
const express=require('express');
const app = express();
const uuid=require('uuid');
const admins = require('./routes/api/admins')

// Use it with post
app.use(express.json());

const Admin = require('./models/Admin.js');

// Direct to Route Handlers
app.use('/routes/api/admins',admins)

app.get('/Admin', (req, res) => {
    res.send(`<h1>Welcome to Admin Page</h1>
    <a href="/routes/api/admins">View of Admins</a>
    `);
})

const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))
