import React from 'react';
import classNames from 'classnames';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import store from "@/redux/createStore";
import streamActions from "@/redux/reducers/agora/actions";
import * as dbFns from '@/utils/database.util.js';

class CreateStream extends React.Component {

    handleSubmit = async (event) => {
        // Prevent reload
        event.preventDefault();
        const { streamName, uid, category } = this.props;
        let err = null;

        if (!streamName) {
            err = { message: 'Please fill in all fields' };
        }

        dbFns.addVideo(uid, streamName, category);
        if (err) {
            this.setState({ errorMsg: err.message });
            setTimeout(() => this.setState({ errorMsg: false }), 2000);
        } else {
            store.dispatch(streamActions.agoraSetStreamID({streamID: streamName, userID: uid}));
            store.dispatch(streamActions.agoraSetIsInsideStream(true));
        }
    };

    render() {
        const { isVisible } = this.props;

        const createStreamClass = classNames('create-stream-page', {
            'is-visible': isVisible,
        });

        return (
            <div className={createStreamClass}>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <h1>Create Stream</h1>
                    <Field className='input' placeholder='Stream Name' name="streamName" component="input" type="text" />
                    <Field className='input' placeholder='Category' name="category" placeholder='E.g. Sports' component="input" type='text' />
                    <button className='button is-primary' type="submit" >Create Stream</button>
                </form>
            </div>
        )
    }
}

CreateStream = reduxForm({
    form: 'createStreamForm',
    initialValues: {'name': '','category': '',  'userId': ''},
})(CreateStream);

const selector = formValueSelector('createStreamForm');
CreateStream = connect(state => {
    const {
        streamName,
        category,
    } = selector(state, 'streamName','category', 'userId');

    return {
        streamName,
        category,
    }
})(CreateStream);

export default CreateStream;
