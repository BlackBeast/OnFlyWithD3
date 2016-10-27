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
    data.push(_.random(0, 100));
    data.shift(1);
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
    svg.append('path')
        .attr('d', line(data))
        .attr('transform', "translate(" + MARGIN + "," + MARGIN +")")
        .classed('path', true);
};
var createBarChart = function createBarChart(svg, randomNumbers, yScale, xScale) {
    svg.selectAll('rect')
        .data(randomNumbers)
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
        .classed('rect', true);
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
        });

    setInterval(function () {
        var data = lastRandomData();
        lineChart.selectAll('.path').remove();
        barChart.selectAll('.rect').remove();
        createLineChartPath(lineChart, line, data);
        createBarChart(barChart, data, yScale, xScale);

    }, 350);

};

window.onload = loadChart;
