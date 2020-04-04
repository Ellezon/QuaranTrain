import React from 'react';
import classNames from "classnames";
import { connect } from "react-redux";
import AgoraStream from "@/utils/agora.util";
import store from "@/redux/createStore";
import settingsActions from "@/redux/reducers/settings/actions";
import { getAgoraCurrentStream } from "@/redux/reducers/agora/selectors";

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

    render() {
        return (
            <div className='live-stream'>
                <div className='video' id='video-stream' />
                <div className='controls'>
                    <button onClick={() => this.startStreaming(false)} >Create Stream</button>
                    <button onClick={() => this.startStreaming(true)}  >Watch Stream</button>
                    <button onClick={() => this.stopStreaming(false)} >Exit</button>
                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) => ({
    currentStream: getAgoraCurrentStream(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
