import React from 'react';
import AgoraStream from "@/utils/agora.util";
import store from "@/redux/createStore";
import settingsActions from "@/redux/reducers/settings/actions";

let streamList = [];

class Stream extends React.Component {
    video = undefined;

    addStream = (stream, push = false) => {
        let id = stream.getId();
        // Check for redundant
        let redundant = streamList.some(item => {
            return item.getId() === id;
        });
        if (redundant) {
            return;
        }
        // Do push for localStream and unshift for other streams
        push ? streamList.push(stream) : streamList.unshift(stream);
        // if (streamList.length > 4) {
        //     options.displayMode = options.displayMode === 1 ? 0 : options.displayMode;
        // }

        console.log(streamList);

        for (let streamobj of streamList) {
            this.createStream(streamobj);
        }
    };

    createStream = (stream) => {
        let id = stream.getId();
        let dom = document.querySelector("#video-item-" + id);
        if (!dom) {
            dom = document.createElement("section");
            let box = document.createElement("div");
            dom.setAttribute("id", "video-item-" + id);
            dom.setAttribute("class", "video-item");
            box.setAttribute("class", "video-item-box");
            dom.appendChild(box);
            this.video.appendChild(dom);
            stream.play("video-item-" + id);
        }
        // if (fit) {
        //     dom.classList.add("window__fit");
        // } else {
        //     dom.classList.remove("window__fit");
        // }
        // dom.setAttribute("style", style);
    };

    componentDidMount() {
        // AgoraStream.initClient();
        //
        // AgoraStream.joinChannel('first', null);
        //
        // store.dispatch(settingsActions.appInitialized());
    }

    render() {
        return (
            <div className='video-stream'  ref={(ref) => { this.video = ref;}}>
                <canvas ref={(ref) => { this.canvas = ref;}} />
            </div>
        );
    }
}

export default Stream;

