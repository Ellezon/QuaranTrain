import React from 'react';
import { authentication } from '@/utils/firebase.util.js';
import * as authFns from '@/utils/authentication.util.js';
import * as dbFns from '@/utils/database.util.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        authentication.getRedirectResult().then(function (result) {
            if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
            }
            
            const user = dbFns.getStudent(result.user.uid);
            if(!user){
                dbFns.addStudent(result.user.uid, result.user.displayName, result.user.photoURL,result.user.email);
            }
            return result;
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
            <button onClick={() =>  authFns.googleSignIn()}>Log In</button>
        return (
            <div>
                {authButton}
            </div>
        )
    }
}

export default App;

