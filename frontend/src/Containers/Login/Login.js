import React, {Component} from 'react';
import {toast,ToastContainer} from "react-toastify";
import {Redirect} from "react-router-dom"

class Login extends Component {
    state = {
        userName:"",
        userEmail:"",
        data: null
    };

    inputValHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    pushHandler = () => {
        this.props.history.push('/main');
    };

    async componentDidMount() {
        try {
            const getLocalStorage = await localStorage.getItem('user');
            if (!getLocalStorage) {
                this.setState({data: null})
            } else {
                this.setState({data: JSON.parse(getLocalStorage)});
            }
        } catch (e) {
            return undefined
        }
    }

    loginHandler  = (e) => {
      e.preventDefault();
      try {
        if(this.state.userName === ""|| this.state.userEmail === ''){
            toast.error("заполните не заполненные поля!")
        }else {
            const date = new Date();
            const localState = JSON.stringify({
                userName: this.state.userName,
                userEmail: this.state.userEmail,
                date: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' : ' + date.getHours() + ':' + date.getMinutes(),
            });
            localStorage.setItem("user",localState);
            this.pushHandler();
        }
      }catch (error) {
          toast.error(error)
      }
    };

    render() {
        if(this.state.data !== null) return <Redirect to="/main"/>;
        return (
            <div className="LoginContainer">
                <ToastContainer/>
                {this.state.data === null ? (
                    <div className="login_block">
                        <input type="text" className="user_name" name="userName" onChange={this.inputValHandler}/>
                        <input type="text" className="user_email" name="userEmail" onChange={this.inputValHandler}/>
                        <button className="login" onClick={this.loginHandler}>войти</button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        );
    }
}

export default Login;