import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {axiosAPI} from "../../axiosAPI";
import {toast,ToastContainer} from "react-toastify";
import './AddNews.css'
import Header from "../../Components/Header/Header";

class AddNews extends Component {

    state = {
        userName: "",
        userEmail: "",
        news: "",
        image:{},
        mainTitle: "",
    };

    componentDidMount() {
        const user = localStorage.getItem('user');
        const parseUser = JSON.parse(user);
        if(!user){
            this.setState({user: null})
        }else {
            this.setState({userName: parseUser.userName, userEmail: parseUser.userEmail});
        }
    }

    inputValHandler = (e) => {
      this.setState({[e.target.name]: e.target.value});
    };

    fileChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.files[0]});
    };

    addNewsHandler = () => {
        try{
            const newNews = new FormData();
            Object.keys(this.state).forEach(key => {
                newNews.append(key, this.state[key])
            });
            axiosAPI.post('/news',newNews);
            toast.success("новость сохранена");
        }catch(error){
            toast.error(error);
        }
    };

    render() {
        if(this.state.user === null) return <Redirect to="/"/>;
        return (
            <div className="AddNewsContainer">
                <Header/>
                <ToastContainer/>
                <p className="title_page">Добавить Новость!</p>
                <div className="inputs">
                    <input type="text" name="news" className="news" placeholder="" onChange={this.inputValHandler}/>
                    <input type="text" name="mainTitle" className="mainTitle" onChange={this.inputValHandler}/>
                    <input type="file" name="image" onChange={this.fileChangeHandler}/>
                    <button className="add" onClick={this.addNewsHandler}>добавить</button>
                </div>
            </div>
        );
    }
}

export default AddNews;