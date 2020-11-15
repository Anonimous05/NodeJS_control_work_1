const express = require('express');
const fileData = require('../../fileData');

const router = express.Router();

router.get('/:id', async (req,res) => {
    try {
        const news = await fileData.findId(req.params.id);
        const comments = await fileData.filterComments(req.params.id);
        res.send({news: news,comments: comments});
   } catch (error) {
        res.send(error);
    }
});

module.exports = router;