import React from 'react';
import * as authFns from '@/utils/authentication.util.js';
import { getUserIsLoggedIn } from "@/redux/reducers/user/selectors";
import { connect } from "react-redux";
import store from "@/redux/createStore";
import userAction from "@/redux/reducers/user/actions";


const logoutUser = () => {
    authFns.googleSignOut();

    store.dispatch(userAction.logoutUser());
};

const Header = ({ isLoggedIn, type }) => {
    return (
        <div className={`page-header ${type}`}>
            <div className='page-header-logo' />
            <div className='page-header-name'>
                QuaranTrain
            </div>

            {isLoggedIn && <button onClick={() => logoutUser()}>Log Out</button>}
        </div>
    );
}


const mapStateToProps = (state) => ({
    isLoggedIn: getUserIsLoggedIn(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
