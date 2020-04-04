import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='login-page'>
                <article>
                    <h1>Stay in and stay in shape</h1>
                    <q>If you think lifting is dangerous, try being weak</q>
                </article>
                <div className="login-page-actions">
                    {authButton}
                </div>
            </div>
        )
    }
}


export default Register;
