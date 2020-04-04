import React from 'react';
import classNames from "classnames";
import { connect } from "react-redux";
import AgoraStream from "@/utils/agora.util";
import store from "@/redux/createStore";
import settingsActions from "@/redux/reducers/settings/actions";
import { getAgoraCurrentStream, getAgoraIsStreaming } from "@/redux/reducers/agora/selectors";

import UserBox from './UserBox';
import UserList from './UserList';

import './_liveStream.scss';

class Stream extends React.Component {

    startStreaming = (isWatching) => {
        AgoraStream.initClient(isWatching);
        AgoraStream.joinChannel('test', Math.floor(Math.random() * 600) + 1, isWatching);
    };

    stopStreaming = () => {
        AgoraStream.leaveChannel();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { currentStream } = this.props;

        if (prevProps !== currentStream) {
            document.getElementById('video-stream').innerHTML = '';

            if (currentStream) {
                currentStream.play('video-stream');
            }
        }
    }

    handleStreamButton() {
        const { isStreaming } = this.props;

        if (isStreaming) {
            this.stopStreaming();
        } else {
            this.startStreaming(false);
        }

    }

    render() {
        const { isStreaming } = this.props;

        const streamButtonClass = classNames('btn stream-control', {
            'is-streaming': isStreaming,
        });

        return (
            <div className='live-stream'>
                <div className='video' id='video-stream' />
                <div className='container'>
                    <div className='header'>
                        <UserBox />
                        <UserList />
                        <div className='btn close-stream' onClick={() => this.stopStreaming(false)} />
                    </div>

                    <div className={streamButtonClass} onClick={() => this.handleStreamButton(false)} />

                    <div className='chat'>
                        <input type='text' placeholder='Type something...' />
                        <div className='btn send-message' />
                    </div>
                    <div className='test'>
                        <button onClick={() => this.startStreaming(true)}  >Watch Stream</button>
                    </div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) => ({
    currentStream: getAgoraCurrentStream(state),
    isStreaming:   getAgoraIsStreaming(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
