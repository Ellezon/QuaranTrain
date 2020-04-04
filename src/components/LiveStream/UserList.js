import React from 'react';
import classNames from "classnames";
import { connect } from "react-redux";

import './_userList.scss';

class UserList extends React.Component {

    createUserIcon(user) {
        return <div className='avatar' style={{ background: `url(${user.userImage})` }} />
    }

    render() {
        const { userList } = this.props;

        return (
            <div className='user-list'>
                { userList.map((user) => this.createUserIcon(user)) }
            </div>

        );
    }
}

UserList.defaultProps = {
    userList: [
        {
            userName: 'Ricardo',
            userImage: 'https://scontent.fmla1-2.fna.fbcdn.net/v/t1.0-9/42943779_2048039118567546_4299701286263062528_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=vhnQGyUHxq0AX_9MPeW&_nc_ht=scontent.fmla1-2.fna&oh=e0221d148b333fbe48ce14d816f7e791&oe=5EAE836E',
        },
        {
            userName: 'Kamil',
            userImage: 'https://scontent.fmla1-1.fna.fbcdn.net/v/t1.0-9/70624710_3621309824561530_4867838267392786432_o.jpg?_nc_cat=107&_nc_sid=85a577&_nc_ohc=gpHcpjTq-R8AX8M_9w8&_nc_ht=scontent.fmla1-1.fna&oh=17c0ef7369a1e1ff65c01ca7f0bb55c4&oe=5EACA5F1',
        },
        {
            userName: 'Tess',
            userImage: 'https://scontent.fmla1-2.fna.fbcdn.net/v/t1.0-1/p320x320/62077729_10212387065105725_910184087774298112_n.jpg?_nc_cat=100&_nc_sid=dbb9e7&_nc_ohc=scReVWjQKo4AX8xVpJG&_nc_ht=scontent.fmla1-2.fna&_nc_tp=6&oh=a4ef83c62c1f05dec27f2468c2720775&oe=5EB05528',
        },
        {
            userName: 'Neil',
            userImage: 'https://www.facebook.com/search/async/profile_picture/?fbid=650983442&width=72&height=72',
        },
    ]
};


const mapStateToProps = (state) => ({
    userList:  undefined,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
