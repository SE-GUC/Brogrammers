<<<<<<< HEAD

const express = require('express')

const admins = require('./routes/api/admins.js');

const app = express();
app.use(express.json())

app.get('/Admin', (req, res) => {
    res.send(`<h1>Welcome to Admins Page</h1>
    <a href="./routes/api/admins/">Admins</a>
    `);
});

// Direct routes to appropriate files 
app.use('/routes/api/admins', admins);

// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })

const port = 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));


// const express = require('express');
// const app = express();
// const Admin = require('./models/Admin.js');
// const Joi = require('joi');

// app.use(express.json());

// const arrayOfAdmins=[
//     new Admin("Atef",1,"atef@gmail.com","01005478965",34,"Male","2018-07-23","moatef","1234"),
//     new Admin("Alaa",2,"alaa@gmail.com","01007778965",23,"Male","2018-06-12","alaas","3456"),
//     new Admin("Omar",3,"omar@gmail.com","01006678965",38,"Male","2018-07-08","raed","12345"),
//     new Admin("Waly",4,"waly@gmail.com","01005578965",40,"Male","2018-12-15","walys","5555"),
//     new Admin("Andrew",5,"andrew@gmail.com","01001178965",44,"Male","2018-09-11","andrew","6666")
//     ]


// app.get('/admin', (req, res) => {
//     res.send('<h1>Welcome to the admin page</h1><a href="/admins"> Admins </a>');
// });
// app.get('/admins/', (req, res) => {
//     const info = [];
//     for(var i = 0;i<arrayOfAdmins.length;i++)
//     {
//         const admin = arrayOfAdmins[i];
//         curr = {
//             name : admin.name,
//             id : admin.id,
//             age : admin.age,
//             gender : admin.gender,
//             joinDate : admin.joinDate,
//             email : admin.email,
//             phone : admin.email
//         }
//         info.push(curr);
//     }
//     res.send(info);
// });

// app.get('/admin/:id', (req, res) => {
//     const adminId =  req.params.id;
//     const admin = arrayOfAdmins.find(curr => curr.id == adminId);
//     console.log(admin);

//     res.send(admin);
// });

// app.put('/admin/:id',(req, res) => {
//     const adminId =  req.params.id;
//     const admin = arrayOfAdmins.find(curr => curr.id == adminId);
//     admin.username = req.body.username;
//     admin.password = req.body.password;
//     admin.email = req.body.email;
//     admin.phone = req.body.phone;

//     res.send(admin);
// });

// const port = 3000;
// app.listen(port, () => console.log("Running on port"));
=======
const express=require('express');
const app = express();
const uuid=require('uuid');
const admins = require('./routes/api/admins')



// Use it with post
app.use(express.json());

const Admin = require('./Models/Admin.js');

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








>>>>>>> 1813d5e4a93c9ad232a7368f9b6daf7e7cd89705
