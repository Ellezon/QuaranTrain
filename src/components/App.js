import React from 'react';
import classNames from 'classnames';
import '../styles/main.scss';

import consoleUtil from '@/utils/console.util';

import Footer from '@/components/Footer/Footer.js';
import Header from '@/components/Header/Header';
import VideoDashboard from '@/components/VideoDashboard/VideoDashboard'
import CreateStream from "@/components/CreateStream/CreateStream";
import LiveStream from "@/components/LiveStream/LiveStream";

import { authentication } from '@/utils/firebase.util.js';
import * as dbFns from '@/utils/database.util.js';
import StartPage from './StartPage/StartPage';
import store from "@/redux/createStore";
import userAction from "@/redux/reducers/user/actions";
import { connect } from "react-redux";
import { getUserHasAuthEnded, getUserIsLoggedIn, getUserId } from "@/redux/reducers/user/selectors";
import { getIsInsideStream, getStreamID } from "@/redux/reducers/agora/selectors";

class App extends React.Component {
    state = {
        isCreateStreamOpen: false,
    };

    componentDidMount() {
        authentication.getRedirectResult().then(async (result) => {
            if (result.user) {
                consoleUtil('auth', `User logged in from Redirection ${result}`);
                console.log('result', result);
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
        authentication.onAuthStateChanged(async (user) => {
            console.log('lala', user);
            if (user !== null) {
                const dbUser = await dbFns.getStudent(user.uid);
                store.dispatch(userAction.loginUser(user));
                consoleUtil('auth', `User authenticated => ${JSON.stringify(dbUser)}`);
            } else {
                store.dispatch(userAction.finishAuth());
            }
        });
    }

    renderPage() {
        const { isCreateStreamOpen } = this.state;
        const { isLoggedIn, hasAuthEnded, userId, isInsideStream } = this.props;
        let response = null;

        if (hasAuthEnded && isLoggedIn) {
            if (isInsideStream) {
                response = (<LiveStream />);
            } else {
                response = (
                    <>
                        <Header type='inner' />
                        <VideoDashboard uid={userId}/>
                        <CreateStream isVisible={isCreateStreamOpen} uid={userId} />
                        <Footer onCameraClick={() => this.setState({ isCreateStreamOpen: !isCreateStreamOpen }) } />
                    </>
                );
            }
        } else {
            response = (
                <>
                    <Header type='transparent' />
                    <StartPage />
                </>
            );
        }

        return response;
    }

    render() {
        const { isLoggedIn, hasAuthEnded } = this.props;

        const splashScreenClasses = classNames('splash-screen', {
            'is-visible': !hasAuthEnded,
        });

        return (
            <div id="app">
                <div className={splashScreenClasses}/>

                { this.renderPage() }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn:     getUserIsLoggedIn(state),
    hasAuthEnded:   getUserHasAuthEnded(state),
    userId:         getUserId(state),
    isInsideStream: getIsInsideStream(state),
    streamID:       getStreamID(state)
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
