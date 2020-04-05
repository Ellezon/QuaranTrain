import React from 'react';

import LoginForm from '@/components/Login/Login';
import RegisterForm from "@/components/Register/Register";

import GoogleIcon from '@/images/googleIcon.png'

import * as authFns from '@/utils/authentication.util.js';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUp: false,
      isLogin: false,
    };
  };

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
      <div className='start-page'>
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
      </div>
    )
  };

  render() {
    const { isSignUp, isLogin } = this.state;
    return (
      <>
        {isSignUp && <RegisterForm />}
        {isLogin && <LoginForm />}
        {!isSignUp && !isLogin && this.renderIntro()}
      </>
    )
  }


}
export default StartPage;

