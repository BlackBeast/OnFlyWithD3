var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var translate = (x, y) => (`translate (${x}, ${y})`);

const WIDTH = 680;
const HEIGHT = 680;
const MARGIN = 50;
const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

var xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, INNER_WIDTH]);

var yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([INNER_HEIGHT, 0]);

var xVal = d => (xScale(d / 10));
var yVal = d => (yScale((3 * (Math.sin(d)) + 5) / 10));

let generateCircles = function (xScale, yScale, data, conatiner) {
    conatiner.append('g').selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('r', 5)
        .attr('cx', xVal)
        .attr('cy', yVal)
};

var loadChart = function (x) {
    let svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis);

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .call(yAxis);

    let g = svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN));

    let line = d3.line()
        .x(xVal)
        .y(yVal)
        .curve(x);

    g.append('path')
        .attr('d', line(data))
        .classed('line',true);


    let area = d3.area()
        .x(xVal)
        .y0(INNER_HEIGHT)
        .y1(yVal)
        .curve(x);

    g.append('path')
        .attr('d', area(data))
        .classed('area',true);

    generateCircles(xVal,yVal,data, g);

    g.selectAll('circle').exit().remove();

};

let interpolations = [
  d3.curveLinearClosed,
  d3.curveStepAfter,
  d3.curveBasisOpen,
  d3.curveCardinalClosed,
  d3.curveBasis
];


let areaCharts = () => (interpolations.forEach(x => loadChart(x)));

window.onload = areaCharts;
