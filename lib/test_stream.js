const Twitter = require('twitter');

const TweetStream = {

  runStream(){

    const client = new Twitter({
      consumer_key: 'ZY8hGC1L3GFZQCr37FojnUQMs',
      consumer_secret: 'NTqgbXWU1FvtNq8dZtkALDcBaLFdc1l3mnqRF5T13mQ23griCC',
      access_token: '836432860890468354-tPluyK4PLxnWkCosLrkURvSPM5amL1L',
      access_token_secret: '3XlCPZrq1OlqJCwYM0HLIHLMNeK2G4pt7pBF90CUWiY3k'
    });

      client.stream('statuses/filter', {track: 'twitter'},  function(stream) {
    stream.on('data', function(tweet) {
      console.log(tweet.text);
    });

    stream.on('error', function(error) {
      console.log(error);
    });
  });


  }
}

TweetStream.runStream();

module.exports = TweetStream;
