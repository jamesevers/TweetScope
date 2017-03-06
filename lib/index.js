
const Util = require('./util');
const Maps = require('./map');
const Slider = require("./slider");


document.addEventListener("DOMContentLoaded", function(){
  Util.openModal();
  Maps.initialState();
});


module.exports = {

  showValue: (newValue) => {
    document.getElementById("range").innerHTML=newValue;
  },
  removeModal: () => {
    Util.removeModal();
  },
  switchData: (newValue) => {
    Maps.clearCoords();
    const allData = Util.loadAllData();
    const hourlyTweets = Util.filterByTime(allData, newValue)
    const wordCounts = Util.wordCounts(hourlyTweets);
    Util.topWordCounts(wordCounts);
    Util.getDisplay(hourlyTweets);
    Maps.placeCoords(hourlyTweets);
  },

}
