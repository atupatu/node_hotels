const express = require('express');
const router = express.Router();    
const Person = require('./../models/person');
const { findByIdAndDelete } = require('../models/menu');


//POST method to add person
router.post('/',async (req,res)=>{
    try{
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  })

//Get method to get data
router.get('/', async(req,res)=>{
    try{
        const data =await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  })
  

router.get('/:workType',async(req,res)=>{
    try{
      const workType = req.params.workType; // Extract parameter from the URL
      if(workType=='chef' || workType=='manager' || workType =="waiter"){
        
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error: 'Invalid Work type'});
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error: "Internal server error"});
    }
  
  })

  

  router.put('/:person_id', async (req, res) => {
    try {
        const person_id = req.params.person_id; // Extract id
        const updatedPersonData = req.body; // Extract updated information

        const response = await Person.findByIdAndUpdate(person_id, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run validations
        });

        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log('Data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
});


router.delete("/:id", async(req,res)=>{
    try{
    const id = req.params.id;

    const response =await Person.findByIdAndDelete(id);

    if (!response) {
        return res.status(404).json({ error: "Person not found" });
    }

    console.log('data deleted');
    res.status(200).json({message:'Person Delted successfull'});
}catch(err){
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
}
})

module.exports = router;