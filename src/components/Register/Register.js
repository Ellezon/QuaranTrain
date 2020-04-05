import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import classNames from 'classnames';

import * as dbFns from '@/utils/database.util.js';
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
        const { email, password, passwordConfirmation, firstName, lastName, userType } = this.props;
        let err = null;
        if (!(password && passwordConfirmation && email && firstName && lastName)) {
            err = { message: 'Please fill in all fields' };
        } else if (password && passwordConfirmation && password.localeCompare(passwordConfirmation) === 0) {
            err = await authFns.emailSignUp(email, password, firstName, lastName, userType);
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
        const { userType } = this.props;

        const isStudentToggleClasses = classNames('toggle', { 'is-selected': userType === 'isStudent' });
        const isTrainerToggleClasses = classNames('toggle', { 'is-selected': userType === 'isTrainer' });
        const errorClasses = classNames('error', { 'is-visible': errorMsg });
        return (
            <div className='login-page content'>
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
                    <div>
                        <label className={isStudentToggleClasses}>
                            <Field name="userType" component="input" type="radio" value="isStudent" defaultChecked={true}/> Student
                        </label>
                        <label className={isTrainerToggleClasses}>
                            <Field name="userType" component="input" type="radio" value="isTrainer" /> Trainer
                        </label>
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
    initialValues: {'userType': 'isStudent'},
})(RegisterForm);

const selector = formValueSelector('registerForm')
RegisterForm = connect(state => {
    const {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
        userType
    } = selector(state, 'firstName', 'lastName', 'email', 'password', 'passwordConfirmation', 'userType');
    return {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
        userType
    }
})(RegisterForm)

export default RegisterForm;
