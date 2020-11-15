const express = require('express');
const fileData = require('../../fileData');

const router = express.Router();

router.post('/:id', async (req,res) => {
    try{
        const likes = await fileData.addLike(req.params.id,req.body);
        res.send(likes);
    } catch(error) {
        res.send(error)
    }
});

module.exports = router;