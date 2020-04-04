import React from 'react';
import '../styles/main.scss';
import { Route, Switch, Link } from 'react-router-dom';

import Footer from '@/components/footer.js';
import Header from './Header/Header';


import { authentication } from '@/utils/firebase.util.js';
import * as dbFns from '@/utils/database.util.js';
import StartPage from './StartPage/StartPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
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

    render() {
        const { user } = this.state;
        return (
            <div id="app">
                <Header user={user} />
                <div className='content'>
                    {!user && <StartPage />}
                    {/* {user && <Dashboard/>} */}
                </div>
                {user && <Footer />}
            </div>
        )
    }


}
export default App;

