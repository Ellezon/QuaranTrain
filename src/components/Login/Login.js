import React from 'react';
import { authentication } from '@/utils/firebase.util.js';
import * as authFns from '@/utils/authentication.util.js';
import * as dbFns from '@/utils/database.util.js';

import RegisterForm from "@/components/Register/Register";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        authentication.getRedirectResult().then(async (result) => {
            if (result) {
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

    render() {
        const { user } = this.state;
        const authButton = user ?
            <button onClick={() => authFns.googleSignOut()}>Log Out</button> :
            <button onClick={() => authFns.googleSignIn()}>Log In</button>
        return (
            <Router>
                <div className='login-page'>
                    <article>
                        <h1>Stay in and stay in shape</h1>
                        <q>If you think lifting is dangerous, try being weak</q>
                    </article>
                    <div className="login-page-actions">
                        {authButton}
                        <Link to='/register'>
                            trikki
                        </Link>
                    </div>
                </div>


                <div>
                        <Switch>
                            <Route path='/login'>
                                <Login />
                            </Route>
                            <Route path='/register'>
                                <RegisterForm/>
                            </Route>
                            <Route path='/register' component={RegisterForm} />
                        </Switch>
                </div>
            </Router>
        )
    }
}


export default Login;
