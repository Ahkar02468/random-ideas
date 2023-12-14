const express = require('express');
const router = express.Router();

const ideas = [
     {
          id: 1,
          text: 'Grief ere soils did feel labyrinth of from the parasites friends. None given and nor weary sacred, lemans his present.',
          tag: 'Software',
          username: 'BuruceBanner',
          date: '2023-10-23'
     },
     {
          id: 2,
          text: 'Medesimi oppinione alla con giudice né cosí cosa quali sé. Sua nel di suo che.',
          tag: 'Technology',
          username: 'TonyStark',
          date: '2023-11-24'
     },
     {
          id: 3,
          text: 'Many this had whom are of ungodly so to deeds, a change his long scape.',
          tag: 'Invention',
          username: 'Superman',
          date: '2023-12-01'
     },
     {
          id: 4,
          text: 'Silence sculptured a i and word bore sat, no fiend raven beating the, the sad grew raven grim mystery while.',
          tag: 'Psudoscience',
          username: 'Balckpanther',
          date: '2023-01-23'
     },
]

//get all ideas
router.get('/', (req, res) => {
     res.json({ success: true, data: ideas });
});
//get one ideas
router.get('/:id', (req, res) => {
     const idea = ideas.find(idea => idea.id === parseInt(req.params.id));
     if(!idea) return res.status(404).json({ success: true, message: 'Resource not found' });
     res.json({ success: false, data: idea });
});

module.exports = router;