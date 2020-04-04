import React from 'react';
import '../styles/main.scss';
import { Route, Switch, Link } from 'react-router-dom';


import Footer from '@/components/footer.js';
import Login from './Login/Login';
import Header from './Header/Header';
import RegisterForm from "@/components/Register/Register";
import * as authFns from "@/utils/authentication.util";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isSignUp: false,
        };
    };

    renderSignUp = () => {
        this.setState({
           isSignUp: true,
        });
    };

    renderIntro = () => {
        const { user } = this.state;
        const authButton = user ?
            <button onClick={() => authFns.googleSignOut()}>Log Out</button> :
            <button onClick={() => authFns.googleSignIn()}>Log In</button>;

        return (
            <div id="app">
                <Header />
                <div className='login-page'>
                    <article>
                        <h1>Stay in and stay in shape</h1>
                        <q>If you think lifting is dangerous, try being weak</q>
                    </article>
                    <div className="login-page-actions">
                        {authButton}
                        <button onClick={this.renderSignUp}>Sign Up</button>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    };

    render() {
        const { user, isSignUp } = this.state;
        const authButton = user ?
            <button onClick={() => authFns.googleSignOut()}>Log Out</button> :
            <button onClick={() => authFns.googleSignIn()}>Log In</button>

        return (
        <>
            { isSignUp ? <RegisterForm/> : this.renderIntro()}
        </>
        )
    }


}
export default App;

