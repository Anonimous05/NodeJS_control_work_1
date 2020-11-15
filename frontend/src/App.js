import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import Main from "./Containers/Main/Main";
import Login from "./Containers/Login/Login";
import './App.css';
import AddNews from "./Containers/AddNews/AddNews";
import Details from "./Containers/Details/Details";
import Home from "./Containers/Home/Home";
import Comments from "./Containers/Comments/Comments";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/main" component={Main}/>
                    <Route path="/addNews" component={AddNews}/>
                    <Route path="/details/:id" component={Details}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/comment/:newsId/:commentId" component={Comments}/>
                </Switch>
            </div>
        );
    }
}

export default App;
