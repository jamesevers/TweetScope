const Util = {

  getJSON (url){
    const req = new XMLHttpRequest();
    req.open("GET",url,false);
    req.send(null);
    return JSON.parse(req.responseText);
  },

  parseData(data){
    let coords = [];
    const keys = Object.keys(data);
    keys.forEach((key) => {
      coords.push(data[key])
    });
    return coords;
  },

  loadAllData(){
    const data = this.getJSON('https://raw.githubusercontent.com/jamesevers/TweetScope/master/data/new_tweets.json');
    // const data = this.getJSON('https://raw.githubusercontent.com/jamesevers/TweetinUSA/master/data/march_tweets.json');
    return this.parseData(data);
  },

  filterByTime(data, hour){
    let tweets = [];
    const keys = Object.keys(data);
    const time = parseInt(hour);
    keys.forEach((key) => {
      const tweet = data[key];
      const date = new Date(tweet.created_at);
      const tweetCreatedAt = date.getUTCHours();
      if (tweetCreatedAt === time){
        tweets.push(tweet);
      };
    });
    return tweets;
  },

  getDisplay(data){
    const tweetCount= String(data.length);
    const tweet = data[0].created_at;
    const time = new Date(tweet);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + '00' + ' ' + ampm;
    document.getElementById("count-display").innerHTML=tweetCount + " Tweets at " + strTime;
  },

  wordCounts(data) {
    const counts = {}
    const pattern = /\w+/g
    data.forEach((tweet) => {
      let tweetText = tweet.text;
      //const matchedWords = tweetText.match(pattern);
      const hashTags = tweetText.match(/#[a-z]+/gi);
      if (hashTags !== null){
        hashTags.forEach((word) => {
          if (counts.hasOwnProperty(word)) {
            counts[word] += 1;
          } else {
            counts[word] = 1;
          }
        });
      }
    });
    return counts;
 },

 topWordCounts(data){
   const items = Object.keys(data).map(function(key) {
     return [key, data[key]];
   });
   items.sort(function(first, second) {
     return second[1] - first[1];
   });
   const objects = items.slice(0,10);
   const tags = objects.map((item) => {return item[0]})

   document.getElementById("word-counts").innerHTML=tags;
 },

  openModal(){
   const aboutModal = document.getElementById("aboutModal");
   aboutModal.style.display = "block";
 },

  removeModal(){
     const aboutModal = document.getElementById("aboutModal");
     aboutModal.style.display = "none";
 }


};


module.exports = Util;
