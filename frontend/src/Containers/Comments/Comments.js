import React, {Component} from 'react';
import {axiosAPI} from "../../axiosAPI";
import {Redirect} from "react-router-dom";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/UI/Modal/Modal";
import './Comments.css';
import {toast, ToastContainer} from "react-toastify";

class Comments extends Component {

    state = {
        commentId: this.props.match.params.commentId,
        newsId: this.props.match.params.newsId,
        comment: {},
        modal: false,
        answer: "",
        user: {},
        answers: null,
    };

    fetchComment = async () => {
        const comment = await axiosAPI.get(`/comments/${this.state.commentId}`);
        if(!comment){
            this.setState({comment: null});
        }else {
            this.setState({comment: comment.data});
        }
    };

    fetchAnswers = async () => {
      const answers = await axiosAPI.get(`/answers/${this.state.commentId}`);
      if(!answers){
          this.setState({answers: null})
      }else {
          this.setState({answers: answers.data});
      }
    };

    componentDidMount() {
        this.fetchComment();
        this.fetchAnswers();
        const user = localStorage.getItem('user');
        if(!user){
            this.setState({user: null})
        }else {
            this.setState({user: JSON.parse(user)});
        }
    }

    inputValHandler = (e) => {
      this.setState({[e.target.name]: e.target.value});
    };

    closeModal = () => {
      this.setState({modal: false})
    };

    answerForComment = () => {
        try {
            const answer = {
                answerTo:this.state.commentId,
                author: this.state.user.userName,
                answer: this.state.answer,
                commentTo: this.state.newsId,
            };
            axiosAPI.post('/comments',answer);
            this.fetchAnswers();
            this.closeModal();
        } catch (error) {
            toast.error(error);
        }
    };

    render() {
        if(this.state.user === null) return <Redirect to="/"/>;
        return (
            <div className="CommentsContainer">
                <Header/>
                <ToastContainer/>
                <Modal show={this.state.modal} close={this.closeModal}>
                    <input type="text" name="answer" className="comment_input" placeholder="коментарий..." onChange={this.inputValHandler}/>
                    <button className="addComment" onClick={this.answerForComment}>добавить</button>
                </Modal>
                {this.state.comment !== null ? (
                    <div className="comment_block">
                        <p className="author">{this.state.comment.author}</p>
                        <a href={`/comment/${this.state.commentId}`} className="comment">
                            {this.state.comment.answer}
                        </a>
                        <button onClick={() => this.setState({modal: true})}>ответить</button>
                    </div>
                ) : (
                    <></>
                )}
                {this.state.answers !== null ? Object.keys(this.state.answers).map(answer => (
                    <div className="answer_block" key={answer}>
                        <p className="author">{this.state.answers[answer].author}</p>
                        <a href={`/comment/${this.state.newsId}/${this.state.answers[answer].id}`} className="answer">
                            {this.state.answers[answer].answer}
                        </a>
                    </div>
                )) : (
                    <p className="null_text">Ответов нет</p>
                )}
            </div>
        );
    }
}

export default Comments;