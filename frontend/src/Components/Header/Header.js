import React, {Component} from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <nav className="main_nav">
                    <ul className="main_ul">
                        <li><NavLink to="/main">новости</NavLink></li>
                        <li><NavLink to="/addNews">добавить новость</NavLink></li>
                        <li><NavLink to="/home">Мой профиль</NavLink></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;