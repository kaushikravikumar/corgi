const SlackBot = require('slackbots');
// const auth_token = process.env.SLACK_AUTH_TOKEN;

const bot = new SlackBot({
    token: "",
    name: 'corgi'
});

bot.on('message', (data) => {
    if(data.type === 'message' && data.files != null && data.channel != "")
    {
        bot.postMessage(data.channel, "Now, what tag(s) would you like to save this image under? Seperate with commas!");
        sendImageURL(data.files[0].url_private);
    }
});

sendImageURL = (imageURL) => {
    bot.on('message', (data) => {
        if(data.type === 'message' && data.text != "")
        {
            var tags = data.text.split(",").map(x => x.trim());
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
      .then(response => response.json()); // parses JSON response into native JavaScript objects 
  }

storeImage = (imageURL, tags) => {
    // TODO MAKE POST REQUEST TO BACKEND SERVICE HERE!
};