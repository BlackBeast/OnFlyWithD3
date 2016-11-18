var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let translate = (x, y) => (`translate (${x}, ${y})`);

const WIDTH = 940;
const HEIGHT = 680;
const MARGIN = 50;
const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

let xScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, INNER_WIDTH]);

let yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([INNER_HEIGHT, 0]);


let generateCircles = function (xScale, yScale, data, conatiner) {
    conatiner.append('g').selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('r', 5)
        .attr('cx', d =>xScale(d))
        .attr('cy', d =>yScale((Math.sin(3 * d) + 1) / 2))
};

const loadChart = function (x) {
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

    let sine = d3.line()
        .x(d =>xScale(d))
        .y(d =>yScale((Math.sin(3 * d) + 1) / 2))
        .curve(x.d3Curve);

    g.append('path')
        .attr('d', sine(data))
        .classed('line',true);

    generateCircles(xScale,yScale,data, g);

    g.selectAll('circle').exit().remove();

};

let tensionArray = [
    {'d3Curve': d3.curveCardinal.tension(-1.5)},
    {'d3Curve': d3.curveCardinal.tension(-1)},
    {'d3Curve': d3.curveCardinal.tension(-0.5)},
    {'d3Curve': d3.curveCardinal.tension(0.5)},
    {'d3Curve': d3.curveCardinal.tension(1)}
];

let tensionInterpolate = () => (tensionArray.forEach(x => loadChart(x)));

window.onload = tensionInterpolate;
