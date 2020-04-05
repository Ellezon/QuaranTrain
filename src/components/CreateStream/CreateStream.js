import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import * as dbFns from '@/utils/database.util.js';
import { getUserId } from '@/redux/reducers/user/selectors';

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
        }
    };

    render() {
        return (
            <div className='create-stream-page'>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div>
                        <label htmlFor="streamName">Stream name</label>
                        <Field name="streamName" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <Field name="category" placeholder='E.g. Sports' component="input" type='text' />
                    </div>
                    <button type="submit" >Create Stream</button>
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
