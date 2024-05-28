const express = require('express');
const fetchUser = require('../middleware/userInfo');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// Route 1 : Fetching the notes of the user
router.get('/fetchNotes', fetchUser , async(req,res)=>{
    try {
        const notes = await Notes.find({user : req.user});
        res.json(notes);
    } catch (error) {
        res.json({error : "Some error occured"});
    }
})



// Route 2 : Creating Notes of user
router.post('/createNotes', fetchUser , [
    body('title','Enter valid title').isLength({min : 3}), 
    body('desc','Enter valid description').isLength({min : 5}),  
    body('tag')] ,async (req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.json({error : result.array()});
    }
    
    try{

        let newNote = await Notes.create({
            title : req.body.title,
            desc : req.body.desc,
            tag : req.body.tag,
            user : req.user
        });
        const saveNote = await newNote.save();
        res.json(saveNote);
    } 
    catch (e){
        console.log(e);
        res.send("Some Error Occured");
    }
});



// Route 3 : To update the note of the user logged in
    router.put('/updateNotes/:id', fetchUser ,[body('title'), body('desc'), body('tag')] ,async (req,res)=>{

        try {
            // creating an updated note
            const {title, desc, tag} = req.body;
            const updateNote = {};
            if(title){updateNote.title = title;}
            if(desc){updateNote.desc = desc;}
            if(tag){updateNote.tag = tag;}
    
            // finding the note that is to be udated
            let note = await Notes.findById(req.params.id);
            if(!note){
                res.json({error : "Note not found"});
            }
            if(note.user.toString() !== req.user){
                res.send("Access Denied");
            }
    
            // Updating the note
            note = await Notes.findByIdAndUpdate(req.params.id, {$set : updateNote}, {new : true})
            res.json(note);
            
        } 
        catch (error) {
            res.json({error : "Some Error Occured"});
        }

    });




    // Route 4 : To delete the note of the user logged in

    router.delete('/deleteNotes/:id', fetchUser, async(req,res)=>{
            try {
            let note = await Notes.findById(req.params.id);
            if(!note){
                res.json({error : "Note not found"});
            }
            if(note.user.toString()!== req.user){
                res.send("Access Denied");
            }
            await Notes.findByIdAndDelete(req.params.id);
            res.json({message : "Note deleted successfully"});   
        }
        catch (error) {
            res.json({error : "Some Error Occured"});
        };
    })



module.exports = router;