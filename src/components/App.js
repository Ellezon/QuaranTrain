import React from 'react';
import { authentication } from '@/utils/firebase.util.js';
import * as authFns from '@/utils/authentication.util.js';
import * as dbFns from '@/utils/database.util.js';
import '../styles/main.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import Footer from '@/components/footer.js';
import Login from './Login/Login';
import Header from './Header/Header';
import RegisterForm from "@/components/Register/Register";

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Link to='/'> </Link>
                    <Switch>
                        <Route path='/' component={Login} />
                        <Route path='/register' component={RegisterForm} />
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        )
    }


}
export default App;

