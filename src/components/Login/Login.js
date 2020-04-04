import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import classNames from 'classNames';

import * as authFns from "@/utils/authentication.util";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: false,
        }
    }

    handleSubmit = async (event) => {
        // Prevent reload
        event.preventDefault();
        const { email, password } = this.props;
        const err = await authFns.emailSignIn(email, password);
      
        if (err) {
            if(err.message === 'There is no user record corresponding to this identifier. The user may have been deleted.')
            {
                err.message = 'Incorrect email entered';
            }
            this.setState({ errorMsg: err.message });
            setTimeout(() => this.setState({ errorMsg: false }), 2000);
        }
    }

    render() {
        const { errorMsg } = this.state;
        const errorClasses = classNames('error', { 'is-visible': errorMsg });
        return (
            <div className='registration-page'>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" component="input" type="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" component="input" type="password" />
                    </div>

                    <button type="submit">Log In</button>
                </form>
                <div className="account-exists">
                        <a href="/">Go back</a>
                </div>
                <div className={errorClasses}>
                    {errorMsg}
                </div>
            </div>
        )
    }
}

LoginForm = reduxForm({
    form: 'loginForm',
})(LoginForm);

const selector = formValueSelector('loginForm')
LoginForm = connect(state => {
    const {
        email,
        password,
    } = selector(state, 'email', 'password');
    return {
        email,
        password,
    }
})(LoginForm)

export default LoginForm;
