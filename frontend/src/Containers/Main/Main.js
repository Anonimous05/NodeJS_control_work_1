import React, {Component} from 'react';
import {axiosAPI} from "../../axiosAPI";
import Header from "../../Components/Header/Header";
import {NavLink, Redirect} from "react-router-dom";
import './Main.css'

class Main extends Component {

    state = {
        news: [],
        user: {},
    };

    fetchNewsHandler = async () => {
      const res = await axiosAPI.get("/news");
      this.setState({news: res.data});
    };

    async componentDidMount() {
        this.fetchNewsHandler();
        const user = await localStorage.getItem('user');
        if(!user){
            this.setState({user: null});
        }else {
            this.setState({user: JSON.parse(user)});
        }
    }

    render() {
        if(this.state.user === null) return <Redirect to="/"/>;
        return (
            <div className="MainContainer">
                <Header/>
                <div className="news">
                    {this.state.news && Object.keys(this.state.news).map(info => (
                        <div className="news_block" key={info}>
                            <NavLink to={`/details/${this.state.news[info].id}`}>{this.state.news[info].news}</NavLink>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Main;