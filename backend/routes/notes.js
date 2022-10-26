const express = require('express')
const Notes = require("../models/Notes")
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');
const router = express.Router()

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes".login required
router.get('/fetchallnotes',fetchUser, async(req,res)=>{
    try {
        const notes =await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new note using: POST "/api/notes/addnotes".login required
router.post('/addnotes',fetchUser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 6 characters').isLength({ min: 6 }),
  ], async(req,res)=>{
    try {
        const {title,description,tag} = req.body
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title,description,tag, user: req.user.id
        })

        const saveNote = await note.save()

        res.json(saveNote)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }

})
// ROUTE 3:Update an existing note using: Put "/api/notes/updatenote/:id".login required
router.put('/updatenote/:id',fetchUser, async(req,res)=>{
    const {title,description,tag} = req.body
    try {
        // create a new note object
        const newNote = {};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
       
        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};

        // Allow updation only if user has own note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        };

        note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
        res.json(note);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }

})
// ROUTE 4:Delete an existing note using: Delete "/api/notes/deletenote/:id".login required
router.delete('/deletenote/:id',fetchUser, async(req,res)=>{
    try {
        // find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};

        // Allow deletion only if user has own note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        };

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"success":"Note has been successfully deleted" , note:note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }

})

module.exports = router;