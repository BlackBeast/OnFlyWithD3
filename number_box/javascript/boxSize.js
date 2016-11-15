var loadChart = function () {
    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var container = d3.select('.container');

    var fontScale = d3.scaleLinear()
        .domain([0,10])
        .range(['italic bold 12px/30px Verdana, Arial, Helvetica, sans-serif', 'italic bold 120px/180px Verdana, Arial, Helvetica, sans-serif']);


    container.selectAll('div')
        .data(numbers)
        .enter().append('div')
        .style('font', fontScale)
        .text(function (d) {
            return d;
        })
        .classed('block', true);
};
window.onload = loadChart;
