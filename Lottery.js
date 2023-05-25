const Twitter = require('twitter');
const axios = require('axios');

// Twitter Client
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

async function fetchAndTweetResults() {
  try {
    const powerballResponse = await axios.get("https://api.collectapi.com/chancegame/usaPowerball", {
      headers: {
        "content-type": "application/json",
        "authorization": "apikey 7rPMmVpY7tm8mreL4WQkKn:31t3gVefADVSce45JbLeTk"
      }
    });

    const megaMillionsResponse = await axios.get("https://api.collectapi.com/chancegame/usaMegaMillions", {
      headers: {
        "content-type": "application/json",
        "authorization": "apikey 7rPMmVpY7tm8mreL4WQkKn:31t3gVefADVSce45JbLeTk"
      }
    });

    const newPowerballResult = powerballResponse.data.result.numbers;
    const powerballNumbers = [newPowerballResult.n1, newPowerballResult.n2, newPowerballResult.n3, newPowerballResult.n4, newPowerballResult.n5, newPowerballResult.pb].join(", ");
    const powerballTweet = `New Powerball result for ${powerballResponse.data.result.date} is: ${powerballNumbers}`;

    console.log(powerballTweet);
    client.post('statuses/update', {status: powerballTweet})
      .then(tweet => console.log(tweet))
      .catch(error => console.error(error));

    const newMegaMillionsResult = megaMillionsResponse.data.result.numbers;
    const megaMillionsNumbers = [newMegaMillionsResult.n1, newMegaMillionsResult.n2, newMegaMillionsResult.n3, newMegaMillionsResult.n4, newMegaMillionsResult.n5, newMegaMillionsResult.mb].join(", ");
    const megaMillionsTweet = `New MegaMillions result for ${megaMillionsResponse.data.result.date} is: ${megaMillionsNumbers}`;

    console.log(megaMillionsTweet);
    client.post('statuses/update', {status: megaMillionsTweet})
      .then(tweet => console.log(tweet))
      .catch(error => console.error(error));

  } catch (error) {
    console.error('Error fetching lottery results: ', error);
  }
}

// Call the function immediately
fetchAndTweetResults();