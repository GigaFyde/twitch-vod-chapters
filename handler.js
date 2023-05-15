'use strict'

const TwitchGQL = require("twitch-gql").Init();

module.exports = async (event, context) => {

    let VodMoments = TwitchGQL.GetVideoMoments(event.body.video_id);
    let result = ({VodMoments: VodMoments[0].data.video.moments.edges.map(i => i.node)});

    return context
        .status(200)
        .headers({
            "Content-type": "application/json"
        })
        .succeed(result)
}
