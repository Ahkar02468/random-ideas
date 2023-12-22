const express = require('express');
const router = express.Router();
//add idea model
const Idea = require('../models/ideas')

//get all ideas
router.get('/', async (req, res) => {
     try {
          const ideas = await Idea.find();
          res.json({ success: true, data: ideas });
     } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, message: 'Server error on finding ideas.' });
     }
});
//get single ideas
router.get('/:id', async (req, res) => {
     try {
          const findIdea = await Idea.findById(req.params.id);
          res.json({ success: true, data: findIdea });
     } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, message: 'Server error finding single idea.' })
     }
     
});

//post an idea
router.post('/', async (req, res) => {
     const idea = new Idea({
          text: req.body.text,
          tag: req.body.tag,
          username: req.body.username,
     });
     try {
          const savedIdea = await idea.save();
          res.json({ success: true, data: savedIdea });
     } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, message: 'Server error on posting.' }); 
     }
})

//update an idea
router.put('/:id', async (req, res) => {
     try {
          const idea = await Idea.findById(req.params.id);
          if(idea.username === req.body.username){
               const updateIdea = await Idea.findByIdAndUpdate(req.params.id, req.body, { new: true });
               return res.json({ success: true, data: updateIdea });
          }

          //when username does not match
          res.status(403).json({ success: false, message: 'You are not authorized to edit this idea.' });
     } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, message: 'Server error on updating.' });
     }
});

//delete an idea
router.delete('/:id', async (req, res) => {
     try {
          const idea = await Idea.findById(req.params.id);
          if(idea.username ===  req.body.username){
               await Idea.findByIdAndDelete(req.params.id);
               return res.json({ success: true, data: {} });
          }
          //Users name do not match
          res.status(403).json({ success:false, message: 'Yor are not authorized to delete this idea.' });

     } catch (error) {
          console.log(error);
          res.status(500).json({ success:false, message: 'Server error on deleting an idea.' });
     }
     
})

module.exports = router;