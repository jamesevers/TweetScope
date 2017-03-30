const Twitter = require('twitter');

const TweetStream = {

  streamTweets() {

    const client = new Twitter({

      consumer_key: 'HoZCeOnIan4WNuOlOhcMMJ7jv',
      consumer_secret: 'B28dNjHrXHDgnGLMoUhLybTodL1tMBdweDpAERpoSSJ2o2zA3u',
      access_token_key: '836432860890468354-IYyB8pC7REPke29Pfp4Pu6kdtvw9yfS',
      access_token_secret: 'PPqYyRACyi0RZgEw7PbJ3RSNmOK5BPvVwcMw2EkEpi5qe'
    });

    var tweets = [];

    client.stream('statuses/sample',  function(stream) {
      stream.on('data', function(tweet) {
        if (tweet.coordinates || tweet.place){
          if (!tweet.text.includes('http')){
            tweets.push({'text': tweet.text,
            'coordinates': Object(tweet.place['bounding_box']['coordinates'][0][0])
          })
        }
      }
      if (tweets.length > 10){
        stream.destroy();
        return tweets;
      }
      });
      stream.on('error', function(error) {
        console.log(error);
      });
    });

  }
}

module.exports = TweetStream;

TweetStream.streamTweets();
