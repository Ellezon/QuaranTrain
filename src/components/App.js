import React from 'react';
import '../styles/main.scss';
import { Route, Switch, Link } from 'react-router-dom';

import Footer from '@/components/footer.js';
import LoginForm from './Login/Login';
import Header from './Header/Header';
import RegisterForm from "@/components/Register/Register";

import GoogleIcon from '@/images/googleIcon.png'

import { authentication } from '@/utils/firebase.util.js';
import * as authFns from '@/utils/authentication.util.js';
import * as dbFns from '@/utils/database.util.js';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isSignUp: false,
            isLogin: false,
        };
    };

    componentDidMount() {
        authentication.getRedirectResult().then(async (result) => {
            if (result.user) {
                const user = await dbFns.getStudent(result.user.uid);
                if (!user) {
                    const profileInfo = result.additionalUserInfo.profile;
                    dbFns.addStudent(result.user.uid, profileInfo.given_name, profileInfo.family_name, profileInfo.picture, profileInfo.email);
                }
                return result;
            }
        }).catch(function (error) {
            console.log(error);
            return false;
        });
        authentication.onAuthStateChanged((user) => { this.setState({ user }) });
    }

    renderSignUp = () => {
        this.setState({
            isSignUp: true,
        });
    };

    renderLogin = () => {
        this.setState({
            isLogin: true,
        });
    };

    renderIntro = () => {
        return (
            <>
                <article>
                    <h1>Stay in and stay in shape</h1>
                    <q>If you think lifting is dangerous, try being weak</q>
                </article>
                <div className="actions">
                    <button onClick={this.renderLogin}>Log In</button>
                    <button onClick={this.renderSignUp}>Sign Up</button>
                    <button className='google-login' onClick={() => authFns.googleSignIn()}>
                        <img src={GoogleIcon} />
                        <span>Log In with Google</span>
                    </button>
                </div>
            </>
        )
    };

    render() {
        const { isSignUp, isLogin, user } = this.state;
        return (
            <div id="app">
                <Header />
                <div className='content'>
                    {!user && isSignUp && <RegisterForm />}
                    {!user && isLogin && <LoginForm />}
                    {!user && !isSignUp && !isLogin && this.renderIntro()}
                    {user && <button onClick={() => authFns.googleSignOut()}>Log Out</button>}
                </div>
                {user && <Footer />}
            </div >
        )
    }


}
export default App;

