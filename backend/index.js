const express = require('express');
const cors = require('cors');
const config = require('./config');
const fileData = require('./fileData');
const main = require('./Containers/Main/main');
const details = require('./Containers/Details/details');
const comments = require('./Containers/Comments/comments');
const answer = require('./Containers/Answers/answer');
const likes = require('./Containers/Likes/likes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/news',main);
app.use('/details',details);
app.use('/comments',comments);
app.use('/answers', answer);
app.use('/likes',likes);

const run  = async () => {
    await fileData.init();
    await fileData.initComments();
    app.listen(config.port);
};

run().catch(error => {
    console.log(error);
});