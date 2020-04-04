import React from 'react';
import { authentication } from '@/utils/firebase.util.js';
import * as authFns from '@/utils/authentication.util.js';
import * as dbFns from '@/utils/database.util.js';

import Footer from '@/components/footer.js';

class App extends React.Component {
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
            <>
            <div>
                {authButton}
            </div>
            <Footer/>
            </>
        )
    }
}

export default App;

