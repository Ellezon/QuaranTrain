import React from 'react';
import classNames from "classnames";
import { connect } from "react-redux";
import AgoraStream from "@/utils/agora.util";
import store from "@/redux/createStore";
import settingsActions from "@/redux/reducers/settings/actions";
import { getAgoraStreamsList } from "@/redux/reducers/agora/selectors";

import './_liveStream.scss';

class Stream extends React.Component {

    componentDidMount() {
        AgoraStream.initClient();

        AgoraStream.joinChannel('first', Math.floor(Math.random() * 600) + 1  );

        store.dispatch(settingsActions.appInitialized());
    }

    renderVideos = () => {
        const { streams } = this.props;


        return streams.map((stream, i) => {
            let id = stream.getId();

            const streamClass = classNames('stream', {
                'is-main': i === 0,
            });
            setTimeout(() => stream.play("video-item-" + id), 500);

            return (
                <div className={streamClass} id={"video-item-" + id}>
                </div>
            );
        });
    };

    render() {
        return (
            <div className='live-stream'  ref={(ref) => { this.video = ref;}}>
                { this.renderVideos() }
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    streams: getAgoraStreamsList(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
