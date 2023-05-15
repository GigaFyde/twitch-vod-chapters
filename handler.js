'use strict'

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async (event, context) => {
    const response = await fetch('https://gql.twitch.tv/gql', {
        method: 'POST',
        body: `[{"operationName":"VideoPlayer_ChapterSelectButtonVideo","variables\":{"includePrivate":false,"videoID":"${event.body.video_id}" },"extensions":{"persistedQuery":{"version":1,"sha256Hash":"8d2793384aac3773beab5e59bd5d6f585aedb923d292800119e03d40cd0f9b41"}}}]`
        , headers: {
            "Client-Id": "kimne78kx3ncx6brgo4mv6wki5h1ko"
        }});
    const data = await response.json();
    let result = [];
    let res = data;
    let edge = res[0].data.video["moments"].edges
    for (let i = 0; i < edge.length; i++) {
        result.push(
            {
                'game': edge[i].node.details.game.displayName,
                'position': edge[i].node.positionMilliseconds
            })

    }
    return context
        .status(200)
        .headers({
            "Content-type": "application/json"
        })
        .succeed(result)
}
