// const jsonString = '{"name":"John" , "age":"30", "city":"New York"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);

// const objecttoConvert = {
//     name:"Alice",
//     age: 25
// };

// const jsonStringified = JSON.stringify(objecttoConvert);
// console.log(jsonStringified);

const express = require('express')
const app = express()
const db = require('./db');
const passport = require('./auth');
require('dotenv').config();

const PORT = process.env.PORT || 3000
const logRequest = (req ,res ,next) =>{
  console.log(`${new Date().toLocaleString()} Request made to : ${req.originalUrl}`);
  next(); //Move to next phase.
}
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//app.use(logRequest); if u want middleware for all routes.



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get('/' ,localAuthMiddleware ,function (req, res) {
  res.send('Welcome to our Hotel')
})

//app.post('/person' ,(req,res)=>{//const data = req.body //Assuming the request bdoy containts the person data

  // //Create a new person document using the mongoose model
  // const newPerson = new Person()
  // newPerson.name = data.name;
  // newPerson.age = data.age;
  // newPerson.gender = data.gender;
  // newPerson.mobile = data.mobile;
  // newPerson.email = data.email;
  //This can be one way for this

//   const newPerson = new Person(data);

//   //Save the new person to the database
//   newPerson.save((error, savedperson)=>{
//     if(error){
//       console.log('Error saving person:',error);
//       res.status(500).json({error:'Internal server error'})
//     }
//     else{
//       console.log('Data saved successfully');
//       res.status(200).json(savedperson);
//     }
//   })
// }) //callback is old now

// app.post('/person',async (req,res)=>{
//   try{
//       const data = req.body
//       const newPerson = new Person(data);
//       const response = await newPerson.save();
//       console.log('data saved');
//       res.status(200).json(response);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error:'Internal Server Error'});
//   }
// })  //shifted to personRoutes.js

// app.post('/menu', async (req,res)=>{
//   try{
//     const data = req.body
//     const newMenu = new MenuItem(data);
//     const response = await newMenu.save();
//     console.log('data saved');
//     res.status(200).json(response);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error:'Internal Server error'});
//   }
// })

// app.get('/menu' , async(req,res)=>{
//   try{
//     const data = await MenuItem.find();
//     console.log('data fetched');
//     res.status(200).json(data);
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error:'Internal Server error'});
//   }
// })

// app.get('/person', async(req,res)=>{
//   try{
//       const data =await Person.find();
//       console.log("data fetched");
//       res.status(200).json(data);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error:'Internal Server Error'});
//   }
// }) //shifted to personRoutes.js


// app.get('/person/:workType',async(req,res)=>{
//   try{
//     const workType = req.params.workType; // Extract parameter from the URL
//     if(workType=='chef' || workType=='manager' || workType =="waiter"){
      
//       const response = await Person.find({work: workType});
//       console.log('response fetched');
//       res.status(200).json(response);
//     }else{
//       res.status(404).json({error: 'Invalid Work type'});
//     }
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error: "Internal server error"});
//   }

// })

//import router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//Use the routers
app.use('/person',personRoutes);
app.use('/menu',localAuthMiddleware ,menuRoutes);



app.get('/chicken' ,function(req ,res){
    res.send('Your chicken is ready')
})

app.get('/burger' , function(req ,res)
{
    res.send('The burger is ready')
})

app.post('/items', (req,res)=>{
  res.send("The data is saved");
})

app.get('/idli' , (req, res)=>{
  var customized_idli = {
    name: 'rava idli',
    size: '10 cm diameter',
    is_sambhar: true,
    is_chutney:false
  }
  res.send(customized_idli)
})

app.listen(PORT)