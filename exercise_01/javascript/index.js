const UPPER_LIMIT = 100,LOWER_LIMIT = 0,WIDTH = 680,HEIGHT = 720,MARGIN = 50;
const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

var RANGE = 10;
var id = 0;
var data = [];
var createRandomData = function (min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + (min +1) ;
};

var generateRandomNumberArray = function(){
    for (var i = 0; i < RANGE; i++) {
      data.push({value: createRandomData(LOWER_LIMIT,UPPER_LIMIT),key: ++id})
    }
    console.log(data)
    return data;
}

var updateRandomArray = function(array){
    array.shift();
    array.push({value: createRandomData(LOWER_LIMIT,UPPER_LIMIT),key: ++id});
    return array;
}

var colors = d3.scaleLinear()
              .domain([0,100])
              .range(['lightsteelblue','steelblue']);

var createBarChart = function (data) {

  var bar_chart = d3.select('.bar-chart').selectAll('div')
        .data(data,function(d){return d.id})

        bar_chart.enter()
          .append('div')
          .attr('class','bar')
          .style('width',function(d){
            return d.value * 6 +"px"})
          .text(function (d){return d.value})
          .style('background-color',(d)=> colors(d.value));
        bar_chart.exit().remove()
};

var dataArray = generateRandomNumberArray();

var loadChart = function () {
   createBarChart(dataArray);
   dataArray = updateRandomArray(dataArray);
    // setInterval(function () {
    //
    //     createBarChart(dataArray);
    // }, 750);

};

window.onload = function(){
  createBarChart(dataArray);
  setInterval(loadChart,750);
}
loadChart;
