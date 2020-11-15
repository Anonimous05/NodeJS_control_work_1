const express = require('express');
const fileData = require('../../fileData');

const router = express.Router();

router.get('/:id', async (req,res) => {
    try {
        const answer = await fileData.findAnswers(req.params.id);
        res.send(answer);
    }catch(error) {
      res.send(error);
    }
});

module.exports = router;