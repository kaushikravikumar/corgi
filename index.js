const SlackBot = require('slackbots');
const fetch = require('node-fetch');
const askForTagsText = "Now, what tag would you like to save this image under?";
// const auth_token = process.env.SLACK_AUTH_TOKEN;

const bot = new SlackBot({
    token: "",
    name: 'corgi'
});

bot.on('message', (data) => {
    if(data.type === 'message' && data.files != null && data.channel != "")
    {
        bot.postMessage(data.channel, askForTagsText);
        sendImageURL(data.files[0].url_private);
    }
});

sendImageURL = (imageURL) => {
    bot.on('message', (data) => {
        if(data.type === 'message' && data.text != "" && data.text != askForTagsText)
        {
            var tags = data.text.toLowerCase();
            storeImage(imageURL, tags);
        }
    });
};

function postData(url = '', data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()) // parses JSON response into native JavaScript objects 
      .catch(error => console.error('Error:', error));
  }

storeImage = (myImageURL, myTags) => {
    var data = {
        imageURL: myImageURL,
        tags: myTags
    };
    console.log(JSON.stringify(data));
    var res = postData('https://hw19-corgi-slack-api.dev.buzzfeed.io/throw', data);
    console.log(res);
};