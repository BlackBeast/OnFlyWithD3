var rawData = [
    {name: 'ramesh', subject: 'maths', score: 87},
    {name: 'suresh', subject: 'maths', score: 45},
    {name: 'pokemon', subject: 'english', score: 65},
    {name: 'mary', subject: 'kannada', score: 44},
    {name: 'riya', subject: 'science', score: 72},
    {name: 'katie', subject: 'social studies', score: 82},
    {name: 'katie', subject: 'maths', score: 98},
    {name: 'ramesh', subject: 'bengali', score: 25},
    {name: 'suresh', subject: 'science', score: 55},
    {name: 'riya', subject: 'tamil', score: 75},
    {name: 'pokemon', subject: 'sports', score: 95},
    {name: 'pokemon', subject: 'social studies', score: 32}
];

var chartArea;

var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

var updateChart = function () {
    var bars = chartArea.selectAll('.bar')
        .data(rawData);

    bars
        .enter().append('div')
        .style('width', function (d) {
            return (d.score * 5) + 'px';
        })
        .text(function (d) {
            return d.name + " " + d.score;
        })
        .classed('bar radial-corner', true)
        .style('background-color', function (d) {
            return colorScale(d.subject);
        });

    bars.exit().remove();
};

var updateLegend = function () {
    var nested_data = d3.nest()
        .key(function (d) {
            return d.subject;
        })
        .entries(rawData);

    d3.select('.labels').selectAll('.legend')
        .data(nested_data, function (d) {
            return d.key;
        })
        .enter().append('div')
        .text(function (d) {
            return d.key;
        })
        .style('background-color', function (d) {
            return colorScale(d.key);
        })
        .classed('legend radial-corner', true);
};
var loadChart = function () {
    chartArea = d3.select('.first-chart');
    updateChart();
    updateLegend();
};

window.onload = loadChart;

var sortByName = function () {
    var bars = d3.selectAll('.bar');
    bars.sort(function (current, next) {
        return current.name < next.name ? -1 : current.name > next.name ? 1 : 0;
    });
};

var sortBySubject = function () {
    var bars = d3.selectAll('.bar');
    bars.sort(function (current, next) {
        return current.subject < next.subject ? -1 : current.subject > next.subject ? 1 : 0;
    });
};

var sortByScore = function () {
    var bars = d3.selectAll('.bar');
    bars.sort(function (current, next) {
        return current.score < next.score ? -1 : current.score > next.score ? 1 : 0;
    });
};
