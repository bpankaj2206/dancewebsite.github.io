const express = require("express");
const path = require("path"); 
const app = express();
const bodyparser=require("body-parser");
const mongoose = require('mongoose');

// getting-started.js
mongoose.connect('mongodb://localhost/ContactDance', {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

//DEFINING MONGOOSE SCHEMA
const ContactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    phone: String,
    address: String,
    more: String

});

//MODELLING OUR SCHEMA INTO MODEL/CLASS
const Contact = mongoose.model('ContactDance', ContactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
const port = 8000;

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{ 
    console.log(req.body);
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("this item have been save to database");})
    .catch( ()=>{
        res.status(400).send("item is not saved");});
  
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});


