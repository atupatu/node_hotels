const express = require('express');
const router = express.Router();    
const Person = require('./../models/person');
const {jwtAuthMiddleware ,generateToken} = require('./../jwt');


//POST method to add person
router.post('/signup',async (req,res)=>{
    try{
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        
        const payload = {
          id : response.id,
          username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is:",token);
        res.status(200).json({response:response ,token:token}); 
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  })

router.post('/login', async(req ,res)=>{
  try{
    const {username ,password} = req.body;

    const user = await Person.findOne({username: username});

    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid username or password'});
    }

    //generate Token

    const payload = {
      id : user.id,
      username: user.username
    }
    const token = generateToken(payload);

    res.json({token})
  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Internal server Error'});
  }
})


//Get method to get data
router.get('/', jwtAuthMiddleware, async(req,res)=>{
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