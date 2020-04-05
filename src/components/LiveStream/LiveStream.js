import React from 'react';
import classNames from "classnames";
import { connect } from "react-redux";
import AgoraStream from "@/utils/agora.util";
import {
    getStreamID,
    getAgoraIsStreaming,
    getAgoraCurrentStream,
    getAgoraIsHost
} from "@/redux/reducers/agora/selectors";

import UserBox from './UserBox';
import UserList from './UserList';

import './_liveStream.scss';
import store from "@/redux/createStore";
import streamActions from "@/redux/reducers/agora/actions";

class Stream extends React.Component {

    startStreaming = () => {
        const { streamID, isHost } = this.props;
        AgoraStream.initClient(!isHost);
        AgoraStream.joinChannel(streamID, Math.floor(Math.random() * 600) + 1, !isHost);
    };

    stopStreaming = () => {
        AgoraStream.leaveChannel();
        store.dispatch(streamActions.agoraSetIsInsideStream(false));
    };

    componentDidMount() {
        const { isHost } = this.props;

        if ( !isHost) {
            this.startStreaming(false);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { currentStream } = this.props;

        if (prevProps.currentStream !== currentStream) {
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
        const { isStreaming, isHost } = this.props;

        const streamButtonClass = classNames('btn stream-control', {
            'is-streaming': isStreaming,
        });

        return (
            <div className='live-stream'>
                <div className='video' id='video-stream' />
                <div className='container'>
                    <div className='header'>
                        <UserBox />
                        {/* <UserList /> */}
                        <div className='btn close-stream' onClick={() => this.stopStreaming(false)} />
                    </div>

                    { isHost && (<div className={streamButtonClass} onClick={() => this.handleStreamButton(false)} />)}

                    <div className='chat'>
                        <input type='text' placeholder='Type something...' />
                        <div className='btn send-message' />
                    </div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) => ({
    currentStream: getAgoraCurrentStream(state),
    streamID:      getStreamID(state),
    isHost:        getAgoraIsHost(state),
    isStreaming:   getAgoraIsStreaming(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
