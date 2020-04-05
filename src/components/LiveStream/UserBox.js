import React from 'react';
import classNames from "classnames";
import { connect } from "react-redux";

import './_userBox.scss';

class UserBox extends React.Component {

    render() {
        const { userName, followers, userImage } = this.props;

        return (
            <div className='user-box'>
                <div className='avatar' style={{ background: `url(${userImage})` }} />
                <div className='user-box-content'>
                    <div className='username'>
                        { userName }
                    </div>
                    <div className='followers'>
                        { followers }
                    </div>
                </div>
                <div className='subbed' />
            </div>

        );
    }
}

UserBox.defaultProps = {
    userName: 'Ricardo',
    followers: '1.3m',
    userImage: 'https://scontent.fmla1-2.fna.fbcdn.net/v/t1.0-9/42943779_2048039118567546_4299701286263062528_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=vhnQGyUHxq0AX_9MPeW&_nc_ht=scontent.fmla1-2.fna&oh=e0221d148b333fbe48ce14d816f7e791&oe=5EAE836E',
};


const mapStateToProps = (state) => ({
    userName:  undefined,
    followers: undefined,
    userImage: undefined,
    isSubbed:  false,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);
