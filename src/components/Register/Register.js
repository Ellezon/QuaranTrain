import React from 'react';
import { Field, reduxForm } from 'redux-form'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className='registration-page'>
                <form onSubmit={handleSubmit}>
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

                <div className="account-exists">
                    <p>
                        Already have an account?
                        <a href="#">Sign in</a>
                    </p>
                </div>
            </div>
        )
    }
}

RegisterForm = reduxForm({
    form: 'registerForm',
})(RegisterForm);


export default RegisterForm;
