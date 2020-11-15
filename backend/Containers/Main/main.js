const express = require('express');
const path = require('path');
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('../../config');
const fileData = require('../../fileData');

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const data = await fileData.getItems();
        res.send(data);
    }catch(error){
        res.send(error);
    }
});

router.post('/', upload.single('image'),async (req,res) => {
    if(req.file){
        req.body.image = req.file.filename;
    }
    try {
        const news = {
            author: req.body.userName,
            news: req.body.news,
            mainTitle: req.body.mainTitle,
            email: req.body.userEmail,
            image: req.body.image,
            likes: [],
        };
        await fileData.addItem(news);
        res.send("Новость сохранена");
    }catch(error){
        res.status(400).send(error);
    }
});

router.post('/:id',async (req,res) => {
    try {
        await fileData.addComment(req.params.id,req.body);
        res.send("comment to added!")
    }catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

router.delete('/:id', async (req,res) => {
    try{
        const item = await fileData.findId(req.params.id);
        await fileData.deleteItem(item);
        res.send("Новость удалена!");
    }catch (error) {
        res.send(error)
    }
});

module.exports = router;