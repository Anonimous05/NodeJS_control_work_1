import React, {Component} from 'react';
import Modal from "../../Components/UI/Modal/Modal"
import {axiosAPI} from "../../axiosAPI";
import {toast, ToastContainer} from "react-toastify";
import Header from "../../Components/Header/Header";
import {axiosURL} from "../../axiosURL";
import './Details.css';
import {NavLink, Redirect} from "react-router-dom";

class Details extends Component {

    state = {
        answer: "",
        modal: false,
        news: null,
        user: {},
        id: this.props.match.params.id,
        comments: null,
    };

    fetchNews = async () => {
        const details = await axiosAPI.get(`/details/${this.state.id}`);
        if(!details){
            this.setState({news: null, comments: null});
        }else {
            this.setState({news: details.data.news, comments: details.data.comments});
        }
    };

    async componentDidMount() {
        this.fetchNews();
        const user = localStorage.getItem('user');
        if(!user){
            this.setState({user: null});
        }else {
            this.setState({user: JSON.parse(user)});
        }
    }

    inputValHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    closeModal = () => {
        this.setState({modal: false});
    };

    addComment = () => {
        if(this.state.comment !== ''){
            const comment = {
                author: this.state.user.userName,
                answer: this.state.answer
            };
            axiosAPI.post(`/news/${this.state.id}`,comment);
            this.setState({modal: false});
            this.fetchNews();
        }else {
            toast.error("Напшите комментарий!")
        }
    };

    addLike = () => {
      try {
          axiosAPI.post(`/likes/${this.props.match.params.id}`,{email: this.state.user.userEmail});
          this.fetchNews();
      } catch (error) {
        toast.error(error)
      }
    };

    render() {
        if(this.state.user === null) return <Redirect to="/"/>;
        return (
            <div className="DetailsContainer">
                <Header/>
                <ToastContainer/>
                <Modal show={this.state.modal} close={this.closeModal}>
                    <input type="text" name="answer" className="comment_input" placeholder="коментарий..." onChange={this.inputValHandler}/>
                    <button className="addComment" onClick={this.addComment}>добавить</button>
                </Modal>
                <div className="news_details">
                    {this.state.news !== null ? (
                        <div>
                            <div className="details_news">
                                <div className="img_block">
                                    <img src={axiosURL + '/uploads/' + this.state.news.image} alt=""/>
                                </div>
                                <div className="all_title">
                                    <div className="author_info">
                                        <p>Автор: {this.state.news.author}</p>
                                        <p>eMail: {this.state.news.email}</p>
                                    </div>
                                    <div className="title_news">
                                        <p>{this.state.news.mainTitle}</p>
                                    </div>
                                    <p className="like">Лайков: {this.state.news.likes.length}</p>
                                </div>
                                <button onClick={this.addLike}>👍👍👍</button>
                            </div>
                            <div>
                                <button className="addComment" onClick={() => this.setState({modal: true})}>
                                    оставить комментарий
                                </button>
                            </div>
                            <div className="commentsContainer">
                                {this.state.comments !== null ? (
                                    Object.keys(this.state.comments).map(com => (
                                        <div className="comment_block" key={com}>
                                            <p className="author">{this.state.comments[com].author}</p>
                                            <NavLink to={`/comment/${this.state.comments[com].id}`} className="comment">{this.state.comments[com].answer}</NavLink>
                                        </div>
                                    ))
                                ) : (
                                    <p>null</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        );
    }
}

export default Details;