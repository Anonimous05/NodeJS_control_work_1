const fs = require("fs");
const {nanoid} = require('nanoid');

const readFile = filename => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const writeFile = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const dirName = __dirname;

const deleteFile = (filename) => {
    fs.unlink(`${dirName}/public/uploads/${filename}`,() => {});
};

const filename = "./JSON/News.json";
const fileAnswers = "./JSON/Comments.json";

let data = [];
let answers = [];

module.exports = {
    async init() {
        try {
            const fileContents = await readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (error) {
            data = [];
        }
    },
    async getItems() {
        return data;
    },
    async addItem(item) {
        item.id = nanoid();
        data.push(item);
        await this.save();
    },
    async findId(id) {
        return data.find(item => item.id === id);
    },
    async addComment(item,comment) {
        comment.commentTo = item;
        comment.id = nanoid();
        answers.push(comment);
        await this.saveComments();
    },
    async deleteItem(item) {
        const index = data.findIndex(index => index.id === item.id);
        await data.splice(index, 1);
        await deleteFile(item.image);
        await this.save();
    },
    async findComments(newsId) {
        return answers.find(id => id.id === newsId);
    },
    async filterComments(newsId) {
        return answers.filter(id => id.commentTo === newsId)
    },
    async save() {
        const fileContents = JSON.stringify(data, null, 2);
        await writeFile(filename, fileContents);
    },

    async initComments() {
        try {
            const fileAnswer = await readFile(fileAnswers);
            answers = JSON.parse(fileAnswer.toString());
        }  catch (error) {
            answers = [];
        }
    },
    async addInComments(answer) {
        answer.id = nanoid();
        answers.push(answer);
        await this.saveComments();
    },
    async saveComments() {
        const commentsFile = JSON.stringify(answers, null, 2);
        await writeFile(fileAnswers, commentsFile);
    },
    async findAnswers(id) {
      return answers.filter(answer => answer.answerTo === id)
    },
    async addLike(id,email) {
        const item = await this.findId(id);
        const find = item.likes.find(em => em.email === email.email);
        if(find === undefined){
            item.likes.push(email);
        }else {
            const index = item.likes.findIndex(index => index.email === email.email);
            item.likes.splice(index,1);
        }
        await this.save();
        return item;
    },
};
