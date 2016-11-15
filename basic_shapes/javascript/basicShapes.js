var height = 100;
var width = 600;
var initialPoint = 0;
var specifiedWidth = 100;
var specifiedMargin = 50;

var line = function(svg){
  var shape = svg.append("line")
      .attr("x1", initialPoint)
      .attr("y1", specifiedWidth)
      .attr("x2", specifiedWidth)
      .attr("y2", initialPoint)
      .attr("stroke", "grey")
      .classed('shape',true);
  return shape;
}
var rect = function(svg){
  var shape = svg.append("rect")
      .attr("width", specifiedWidth)
      .attr("height", height)
      .classed('shape',true)
      .attr("stroke", "steelblue")
      .attr("rx", "5px")
      .attr("ry", "5px")
      .attr('transform','translate(300)');

  return shape;
}
var circle = function(svg){
  var shape = svg.append("circle")
      .attr("cx",specifiedWidth / 2)
      .attr("cy", height / 2)
      .attr("r", specifiedWidth / 2)
      .attr("stroke", "red")
      .attr('transform','translate(150)')
      .classed('shape',true);
  return shape;
}

var triangle = function(svg){
  var shape = svg.append("polygon")
      .attr("stroke", "green")
      .classed('shape',true)
      .attr('transform','translate(450)')
      .attr("points", initialPoint+ "," + height + ", "+
                      specifiedMargin+ "," + initialPoint + ", "+
                      specifiedWidth + "," + height);
  return shape;
}
var createShapes = function () {
    var svg = d3.select(".container").append("svg")
        .attr("width", width)
        .attr("height", height);

        line(svg);
        circle(svg);
        rect(svg);
        triangle(svg);
};

window.onload = createShapes();
