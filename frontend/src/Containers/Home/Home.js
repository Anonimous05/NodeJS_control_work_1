import React, {Component} from 'react';
import {NavLink, Redirect} from "react-router-dom";
import Header from "../../Components/Header/Header";
import './Home.css'
import {axiosAPI} from "../../axiosAPI";
import {toast, ToastContainer} from "react-toastify";

class Home extends Component {

    state = {
        userNews: [],
        user: {},
    };

    fetchUserNews = async () => {
        const res = await axiosAPI.get("/news");
        const find = res.data.filter(id => id.email === this.state.user.userEmail);
        if(find !== null){
            this.setState({userNews: find});
        }else {
            this.setState({userNews: null});
        }
    };

    componentDidMount() {
        const user = localStorage.getItem("user");
        if(!user){
            this.setState({user: null})
        }else {
            this.setState({user: JSON.parse(user)});
            this.fetchUserNews();
        }
    }

    deleteNews = (id) => {
        try {
            axiosAPI.delete(`/news/${id}`);
            toast.success("Новость удалена!");
            this.fetchUserNews();
        }catch (error) {
            toast.error(error);
        }
    };

    render() {
        if(this.state.user === null) return <Redirect to="/"/>;
        return (
            <div className="HomeContainer">
                <ToastContainer/>
                <Header/>
                <div className="user_info">
                    <p className="author">Имя: {this.state.user.userName}</p>
                    <p className="email">eMail: {this.state.user.userEmail}</p>
                    <p className="date">дата регистрации: {this.state.user.date}</p>
                </div>
                <div className="my_news">
                    {this.state.userNews !== null ? (
                        Object.keys(this.state.userNews).map(info =>(
                            <div className="news_block" key={info}>
                                <NavLink to={`/details/${this.state.userNews[info].id}`}>{this.state.userNews[info].news}</NavLink>
                                <button className="deleteMyNews" onClick={() => this.deleteNews(this.state.userNews[info].id)}>удалить</button>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;