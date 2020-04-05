import React from 'react';

import LoginForm from '@/components/Login/Login';
import RegisterForm from "@/components/Register/Register";

import GoogleIcon from '@/images/googleIcon.png';
import facebookIcon from '@/images/facebookIcon.png';

import * as authFns from '@/utils/authentication.util.js';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUp: false,
    };
  };

  showSignUp = (state) => {
    this.setState({
      isSignUp: state,
    });
  };

  renderSignUp = () => {
    return (
      <>
        <article>
          <h1>Sign Up</h1>
        </article>

        <RegisterForm goBack={() => this.showSignUp(false)} />
      </>
    );
  };

  renderLogin = () => {
    return (
      <>
        <article>
          <h1>Stay in</h1>
          <h1>Stay in shape</h1>
        </article>

        <LoginForm />

        <div className="actions">
          <p>or connect with</p>

          <div className='actions-buttons'>
            <button className='button facebook' onClick={() => authFns.googleSignIn()}>
              <img src={facebookIcon} />
              <span>Facebook</span>
            </button>
            <button className='button google' onClick={() => authFns.googleSignIn()}>
              <img src={GoogleIcon} />
              <span>Google</span>
            </button>
          </div>
        </div>


        <div className="sign-up-link">
          <p>Dont have an account? <span onClick={() => { this.showSignUp(true) }}>Sign up!</span></p>
        </div>
      </>
    );
  };

  render() {
    const { isSignUp } = this.state;

    return (
      <div className='start-page'>

        {!isSignUp && this.renderLogin()}
        {isSignUp && this.renderSignUp()}

      </div>
    );
  }
}
export default StartPage;

