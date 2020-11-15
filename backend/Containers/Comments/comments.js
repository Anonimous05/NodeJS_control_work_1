const express = require('express');
const fileData = require('../../fileData');

const router = express.Router();

router.get('/:commentId', async (req,res) => {
    try {
        const comment = await fileData.findComments(req.params.commentId);
        res.send(comment);
    }catch (error) {
        res.send(error);
    }
});

router.post('/', async (req,res) => {
    try {
        await fileData.addInComments(req.body);
        res.send('ответ оставлен!');
    }catch(error) {
       res.send(error)
    }
});

module.exports = router;