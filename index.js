const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: process.env.SLACK_AUTH_TOKEN,
    name: 'corgi'
});

bot.on('message', (data) => {
    if(data.type === 'message' && data.files != null && data.channel != "")
    {
        // bot.postMessage(data.channel, "Now, what tag(s) would you like to save this image under? Seperate with commas!");
        // sendImageURL(data.files[0].url_private);
        bot.postMessage(data.channel, data.files[0].url_private);
    }
});

// sendImageURL = (imageURL) => {
//     bot.on('message', (data) => {
//         if(data.type === 'message' && data.text != "")
//         {
//             var tags = data.text.split(",");
//             tags.map(x => x.trim());
//             storeImage(imageURL, tags);
//         }
//     });
// };

// storeImage = (imageURL, tags) => {
//     console.log(imageURL);
//     for(var i = 0; i < tags.length; i++)
//     {
//         console.log(tags[i]);
//     }
// };