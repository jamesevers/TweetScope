
const Util = require('./util');
const Maps = require('./map');
const Slider = require("./slider");


document.addEventListener("DOMContentLoaded", function(){
  Maps.initialState();
});


module.exports = {

  showValue: (newValue) => {
    document.getElementById("range").innerHTML=newValue;
  },
  openModal: () => {
    Util.openModal();
  },
  removeModal: () => {
    Util.removeModal();
  },

  switchData: (newValue) => {
    Maps.clearCoords();
    const allData = Util.loadAllData();
    const hourlyTweets = Util.filterByTime(allData, newValue);
    const wordCounts = Util.wordCounts(hourlyTweets);
    Util.topWordCounts(wordCounts);
    Util.getDisplay(hourlyTweets);
    Maps.placeCoords(hourlyTweets);
  },

  searchTweets: (newValue) => {
    Maps.clearCoords();
    const allData = Util.loadAllData();
    const searchedTweets = Util.searchTweets(allData, newValue)
    Maps.placeCoords(searchedTweets);
  }

}
