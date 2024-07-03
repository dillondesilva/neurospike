import Channel from "./Channel";

class LeakChannel extends Channel {
    constructor(initialX, initialY, channelWidth, channelHeight) {
        super(initialX, initialY, channelWidth, channelHeight, "#10900f");
    }
}

export default LeakChannel;