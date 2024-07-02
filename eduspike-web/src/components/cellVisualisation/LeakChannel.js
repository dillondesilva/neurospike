import Channel from "./Channel";

class LeakChannel extends Channel {
    constructor(initialX, initialY, channelWidth, channelHeight) {
        super(initialX, initialY, channelWidth, channelHeight, "#10f0ff");
    }
}

export default LeakChannel;