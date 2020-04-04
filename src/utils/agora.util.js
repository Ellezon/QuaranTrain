import AgoraRTC from "agora-rtc-sdk";

import consoleUtil from '@/utils/console.util';

import { APP_ID, RESOLUTION_ARR } from "@/constants/agora";

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
            consoleUtil('agora', 'AgoraRTC client initialized');
        });

        this.client = client;
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

        consoleUtil('agora', this.streamList);
        //
        // for (let streamobj of streamList) {
        //     this.createStream(streamobj);
        // }
    }

}

export default new AgoraStream();
