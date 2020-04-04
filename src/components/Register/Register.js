import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import classNames from 'classNames';

import * as authFns from "@/utils/authentication.util";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: false
        }
    }

    handleSubmit = async (event) => {
        // Prevent reload
        event.preventDefault();
        const { email, password, passwordConfirmation } = this.props;
        let err = null;
        if (password.localeCompare(passwordConfirmation) === 0) {
            err = await authFns.emailSignUp(email, password);
        } else {
            err = { message: 'Passwords do not match' };
        }
        if (err) {
            this.setState({ errorMsg: err.message });
            setTimeout(() => this.setState({ errorMsg: false }), 2000);
        }
    }

    render() {
        const { errorMsg } = this.state;
        const errorClasses = classNames('error', { 'is-visible': errorMsg });
        return (
            <div className='login-page'>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <Field name="firstName" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" component="input" type="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" component="input" type="password" />
                    </div>
                    <div>
                        <label htmlFor="password">Confirm password</label>
                        <Field name="passwordConfirmation" component="input" type="password" />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <div className="small-text">
                    <p>
                        Already have an account?
                        <a href="#">Sign in</a>
                    </p>
                    <a href="/">Go back</a>
                </div>

                <div className={errorClasses}>
                    {errorMsg}
                </div>
            </div>
        )
    }
}

RegisterForm = reduxForm({
    form: 'registerForm',
})(RegisterForm);

const selector = formValueSelector('registerForm')
RegisterForm = connect(state => {
    const {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation
    } = selector(state, 'firstName', 'lastName', 'email', 'password', 'passwordConfirmation');
    return {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation
    }
})(RegisterForm)

export default RegisterForm;
