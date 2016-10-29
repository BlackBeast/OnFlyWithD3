const UPPER_LIMIT = 100,LOWER_LIMIT = 0,WIDTH = 680,HEIGHT = 720,MARGIN = 50;
const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

var RANGE = 10;

var data = [];
var createRandomData = function () {
    for (var i = 0; i < RANGE; i++) {
        data.push(_.random(LOWER_LIMIT, UPPER_LIMIT));
    }
};
createRandomData();

var lastRandomData = function () {
    // data.push(_.random(0, 100));
    // data.shift(1);
    data.push(data.shift())
    return data;
};

var initializeChart = function (xAxis, yAxis, div) {
    var svg = d3.select(div).append("svg")
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    svg.append('g')
        .attr('transform', "translate(" + MARGIN + "," + (HEIGHT - MARGIN) + ")")
        .call(xAxis)
        .classed('xAxis', true);

    svg.append('g')
        .attr('transform', "translate(" + MARGIN + "," + MARGIN +")")
        .call(yAxis)
        .classed('yAxis', true);

    return svg;
};

var createLineChartPath = function (svg, line, data) {
  var t = d3.transition().ease(d3.easeLinear)
          .duration(750);

  svg.append('path')
      .attr('d', line(data))
      .attr('transform', "translate(" + MARGIN + "," + MARGIN +")")
      .classed('path', true)
      .transition(t);
var g = svg.append('g')
      .attr('transform', "translate(" + MARGIN + "," + MARGIN +")")


  g.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", WIDTH)
    .attr("height", HEIGHT);
};
var createBarChart = function createBarChart(svg, data, yScale, xScale) {
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('height', function (d) {
            return INNER_HEIGHT - yScale(d);
        })
        .attr('width', 20)
        .attr('x', function (d, i) {
            return xScale(i);
        })
        .attr('y', function (d) {
            return yScale(d);
        })
        .attr('transform',"translate(" + MARGIN + "," + MARGIN +")")
        .classed('rect', true)
};
var loadChart = function () {
    var xScale = d3.scaleLinear()
        .domain([0, RANGE - 1])
        .range([0, INNER_WIDTH]);


    var yScale = d3.scaleLinear()
        .domain([100, 0])
        .range([0, INNER_HEIGHT]);

    var xAxis = d3.axisBottom(xScale).ticks(10);
    var yAxis = d3.axisLeft(yScale).ticks(10);


    var lineChart = initializeChart(xAxis, yAxis, '#line-chart');
    var barChart = initializeChart(xAxis, yAxis, '#bar-chart');

    var line = d3.line()
        .x(function (d, i) {
            return xScale(i);
        })
        .y(function (d) {
            return yScale(d);
        })
        .curve(d3.curveCatmullRom.alpha(0.5));

    setInterval(function () {
        var data = lastRandomData();
        lineChart.selectAll('.path').remove();
        barChart.selectAll('.rect').remove();
        createLineChartPath(lineChart, line, data);
        createBarChart(barChart, data, yScale, xScale);

    }, 750);

};

window.onload = loadChart;
