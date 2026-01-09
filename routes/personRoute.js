const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

// POST route to add a person

router.post('/',async (req,res)=>{
   try{
        const data = req.body // assuming that request body contains the person data

        // Create a new Person documnet using the mongoose model

        const newPerson = new Person(data);
        
        // Save the new person to the database
       const respone = await newPerson.save();
       console.log("Data saved");
       res.status(200).json(respone);
       

   }
   catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
    

   }
})

// GET method to get the Menu Items

router.get("/", async (req, res) => {
  try {
    const personData = await Person.find();
    console.log("Data Feteched");
    res.status(200).json(personData);
  } catch (err) {
    console.error("Failed to fetch error", err);
    res.status(500).json({ error: "Internal server Error" });
  }
});


router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    // Validation
    if (
      workType == "chef" ||
      workType == "waiter" ||
      workType == "manager" ||
      workType == "owner"
    ) {
      const response = await Person.find({ work: workType });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid work Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Error " });
  }
});

router.put('/:id',async (req,res)=>{
  try{
    const personId= req.params.id;
    const updatedPersonData= req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
        new:true,
        runValidators:true
    })

    if(!response) return res.status(404).json({error:"Person Not Foiund"});

    console.log("Data Updated ");
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server error"});
  }
})


router.delete('/:id' , async(req, res)=>{
  try{
    const personId= req.params.id;
    
    const response= await Person.findByIdAndDelete(personId);
    if(!response) return res.status(404).json({error:"Selected person id is not available"});

    console.log("Data Deleted");
    res.status(200).json({message:"Person details are deleted"});

  }catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server Error"});
  }
})

module.exports=router;