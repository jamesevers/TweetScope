const d3 = require("d3");
const topojson = require('topojson');
const Util = require('./util');

const Maps = {




  initialState(){
    const svg = d3.select("svg");
    const path = d3.geoPath();

    const statesGroup = svg.append("g");

    const dataGroup = svg.append("g");

    const initialHour = "2"
    const allData = Util.loadAllData();
    const hourlyTweets = Util.filterByTime(allData, initialHour);
    const wordCounts = Util.wordCounts(hourlyTweets);
    const projection = d3.geoAlbersUsa();
    projection.scale([1300])

    const div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)

    d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
      if (error) throw error;
      statesGroup.selectAll("path")
        .attr("class", "states")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
          .attr("d", path)
          .attr("fill", "#3850a0")
          .attr("opacity", .8)

    svg.append("path")
        .attr("class", "border")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
  });


  setTimeout(this.placeCoords(hourlyTweets),3000);
  Util.getDisplay(hourlyTweets);
  Util.topWordCounts(wordCounts);
  },



  drawMap(){
    var svg = d3.select("svg");

    var path = d3.geoPath();

    d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
      if (error) throw error;

      svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
          .attr("d", path)
          .attr("fill", "blue")
          .attr("opacity", .8)

      svg.append("path")
          .attr("class", "border")
          .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
    });
  },

  placeCoords(data) {

    const svg = d3.select("svg");
    const tweets = Util.parseData(data);
    const projection = d3.geoAlbersUsa();
    projection.scale([1300])

    const div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)

    svg.selectAll("circle")
      .data(tweets).enter()
      .append("circle")
      .attr("cx", (d) => {
        const coord = d.coordinates.coordinates;
        return projection(coord)[0] - 5; // + 60
      })
      .attr("cy", (d) => {
        const coord = d.coordinates.coordinates;
        return projection(coord)[1] + 55; // + 55
       })
      .attr("r", "1px")
      .attr("fill", "url(#RadialGradient)")
      .attr("class", "tweet-initial")
      .style("opacity", .8)
      .on("mouseover", (d) => {
        div.transition()
          .duration(200)
          .style("opacity", .9)
          .style("fill", "yellow");
        div	.html(d.text)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px")
          .style("background", "white")
          .style("color", "#1D2951");
      })
      .on("mouseout", function(d) {
        div.transition()
        .duration(500)
        .style("opacity", 0);
      });
      d3.selectAll("circle")
        .transition()
          .duration(500)
          .style("fill", "orange")
          .attr("r", "6px")
        .transition()
          .duration(500)
          .style("fill", "yellow")
          .attr("r", "3px");
  },

  clearCoords(){
    const svg = d3.select("svg");
    svg.selectAll("circle")
    .remove()
  }
}

module.exports = Maps;
