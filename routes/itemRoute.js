const express = require('express');
const router = express.Router();

const itemSchema = require("./../models/menuItems");


// Get method for getting items details
router.get("/", async (req, res) => {
  try {
    const itemData = await itemSchema.find();
    console.log("Data item Fetched");
    res.status(200).json(itemData);
  } catch (err) {
    console.error("Failed to fetched data", err);
    res.status(500).json({ error: "Internal error " });
  }
});

router.get('/:taste',async(req,res)=>{
        try{
                const taste = req.params.taste;
                if(taste=='sour' ||taste=='sweet'|| taste=='spicy'){
                    const response = await itemSchema.find({taste: taste});
                    console.log("Data fetched");
                    res.status(200).json(response);
                    
                }
                else{
                    console.log("Inavalid parameter");
                    res.status(500).json({error:"Invalid taste paramter"});
                    
                }
        }catch(err){
                console.log(err);
                res.status(500).json({error:"Iternal error "});
                
        }
})

// POST method 
router.post("/", async (req, res) => {
  try {
    const menuData = req.body;

    const newMenu = new itemSchema(menuData);

    const respone = await newMenu.save();
    console.log("Item Data saved");
    res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/:id', async(req, res)=>{
    try{
        const itemId= req.params.id;
        const updatedItemData= req.body;

        const respone = await itemSchema.findByIdAndUpdate(itemId,updatedItemData,{
            new:true,
            runValidators:true,
        });

        if(!respone) return res.status(404).json({message:"Id does not exist"});

        console.log("Data updated");
        res.status(200).json(respone);
         


    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})


router.delete('/:id', async (req, res)=>{
    try{
        const itemId= req.params.id;

        const respone = await itemSchema.findByIdAndDelete(itemId);

        if(!respone) return res.status(404).json({message:"Item id does not exist"});
        
        console.log("Item deleted");
        res.status(200).json(respone);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal sever error"});
        
    }
})

module.exports=router;