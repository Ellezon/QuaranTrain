import React from 'react';
import { authentication } from '@/utils/firebase.util.js';
import * as authFns from '@/utils/authentication.util.js';
import * as dbFns from '@/utils/database.util.js';
import '../styles/main.scss';

import Footer from '@/components/footer.js';
import Login from './Login/Login';
import Header from './Header/Header';

class App extends React.Component {

    render() {
        return (
            <>
            <div>
                <Header />
                <Login />
            </div>
            <Footer/>
            </>
        )
    }


}
export default App;

