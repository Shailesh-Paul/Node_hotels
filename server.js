const express = require('express');
const app = express();
const db = require('./db');
const Person= require('./models/person');



const bodyParser= require('body-parser');
app.use(bodyParser.json()); //req.body


app.get('/',function(req,res){
    res.send('Welcome to my Restaurant sir , What do you like to eat ?')
})





const personRoutes = require('./routes/personRoute');
app.use('/person',personRoutes);

const itemRoute= require('./routes/itemRoute');
app.use('/items',itemRoute);

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});



