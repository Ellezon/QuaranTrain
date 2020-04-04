import AgoraRTC from "agora-rtc-sdk";

import consoleUtil from '@/utils/console.util';

import { APP_ID, RESOLUTION_ARR, SHARE_ID } from "@/constants/agora";
import store from "@/redux/createStore";
import agoraActions from "@/redux/reducers/agora/actions";

class AgoraStream {
    constructor() {
        this.streamList = [];
        this.stream = undefined;
        this.client = undefined;
        this.channelUID = undefined;
    }

    initClient = () => {
        const client = AgoraRTC.createClient({
            mode: 'rtc',
            codec: 'h264',
        });

        client.init(APP_ID, () => {
            store.dispatch(agoraActions.agoraClientInitialized());
            consoleUtil('agora', 'AgoraRTC client initialized');
        });


        this.client = client;
        this.createListeners();
    };

    async joinChannel(channelName, quaranUserID) {
        return new Promise((resolve, error) => {
            this.client.join(
                null, // if server is secure pass security token
                channelName,
                quaranUserID,
                (uid) => {
                    consoleUtil('agora', `User ${uid} join channel successfully`);
                    consoleUtil('agora', new Date().toLocaleTimeString());
                    this.channelUID = uid;
                    this.createStream();
                },
                err => {
                    console.error(err);
                    error('failed');
                }
            );
        });
    };

    createStream() {
        const defaultStreamParam = RESOLUTION_ARR['480p_4'];
        const defaultConfig = {
            streamID: this.channelUID,
            audio: true,
            video: true,
        };

        this.client.setLowStreamParameter({
            width: defaultStreamParam[0],
            height: defaultStreamParam[1],
            framerate: defaultStreamParam[2],
            bitrate: defaultStreamParam[3]
        });

        this.stream = AgoraRTC.createStream(defaultConfig);
        this.stream.setVideoProfile('480p_4');

        this.stream.init(
            () => {
                this.addStream(true);
                this.client.publish(this.stream, err => {
                    console.error("Publish local stream error: " + err);
                });
            },
            err => {
                console.error("getUserMedia failed", err);
            }
        );
    };

    addStream(isLocalStream) {
        const id = this.stream.getId();
        // Check for redundant
        let redundant = this.streamList.some(item => {
            return item.getId() === id;
        });
        if (redundant) {
            return;
        }
        // Do push for localStream and unshift for other streams
        isLocalStream ? this.streamList.push(this.stream) : this.streamList.unshift(this.stream);
        // if (streamList.length > 4) {
        //     options.displayMode = options.displayMode === 1 ? 0 : options.displayMode;
        // }

        store.dispatch(agoraActions.agoraAddMainStream(this.stream));
        consoleUtil('agora', this.streamList);
        //
        // for (let streamobj of streamList) {
        //     this.createStream(streamobj);
        // }
    }

    createListeners() {
        this.client.on("stream-added", (evt) =>{
            let stream = evt.stream;
            let id = stream.getId();
            consoleUtil('agora', "New stream added: " + id);
            consoleUtil('agora', new Date().toLocaleTimeString());
            consoleUtil('agora', "Subscribe ", stream);
            store.dispatch(agoraActions.agoraAddNormalStream(stream));
            // if (id === SHARE_ID) {
            //     options.displayMode = 2;
            //     this.mainId = id;
            //     this.mainStream = stream;
            // }
            // if (id !== this.mainId) {
            //     if (options.displayMode === 2) {
            //         this.client.setRemoteVideoStreamType(stream, 1);
            //     } else {
            //         this.mainStream && this.client.setRemoteVideoStreamType(this.mainStream, 1);
            //         this.mainStream = stream;
            //         this.mainId = id;
            //     }
            // }
            this.client.subscribe(stream, function (err) {
                consoleUtil('agora', "Subscribe stream failed", err);
            });
        });

        this.client.on("peer-leave", function (evt) {
            let id = evt.uid;
            consoleUtil('agora', "Peer has left: " + id);
            consoleUtil('agora', new Date().toLocaleTimeString());
            // if (id === SHARE_ID) {
            //     options.displayMode = 0;
            //     if (options.attendeeMode === "video") {
            //         ButtonControl.enable(".shareScreenBtn");
            //     }
            //     ButtonControl.enable([".displayModeBtn", ".disableRemoteBtn"]);
            //     shareEnd();
            // }
            // if (id === mainId) {
            //     let next = options.displayMode === 2 ? SHARE_ID : localStream.getId();
            //     setHighStream(mainId, next);
            //     mainId = next;
            //     mainStream = getStreamById(mainId);
            // }
            // removeStream(evt.uid);
        });

        this.client.on("stream-subscribed", function (evt) {
            let stream = evt.stream;
            consoleUtil('agora', "Got stream-subscribed event");
            consoleUtil('agora', new Date().toLocaleTimeString());
            consoleUtil('agora', "Subscribe remote stream successfully: " + stream.getId());
            store.dispatch(agoraActions.agoraAddNormalStream(stream));
            // addStream(stream);
        });

        this.client.on("stream-removed", function (evt) {
            let stream = evt.stream;
            let id = stream.getId();
            consoleUtil('agora', "Stream removed: " + id);
            consoleUtil('agora', new Date().toLocaleTimeString());
            // if (id === SHARE_ID) {
            //     options.displayMode = 0;
            //     if (options.attendeeMode === "video") {
            //         ButtonControl.enable(".shareScreenBtn");
            //     }
            //     ButtonControl.enable([".displayModeBtn", ".disableRemoteBtn"]);
            //     shareEnd();
            // }
            // if (id === mainId) {
            //     let next = options.displayMode === 2 ? SHARE_ID : localStream.getId();
            //     setHighStream(mainId, next);
            //     mainId = next;
            //     mainStream = getStreamById(mainId);
            // }
            // removeStream(stream.getId());
        });
    }

}

export default new AgoraStream();
