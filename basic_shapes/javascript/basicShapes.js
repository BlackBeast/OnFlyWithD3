var createShapes = function () {
    var height = 100;
    var width = 600;
    var initialPoint = 0;
    var specifiedWidth = 100;
    var specifiedMargin = 50;


    var svg = d3.select(".container").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("line")
        .attr("x1", specifiedWidth)
        .attr("y1", initialPoint)
        .attr("x2", initialPoint)
        .attr("y2", specifiedWidth)
        .attr("stroke-width", 2)
        .attr("stroke", "grey");

    svg.append("circle")
        .attr("cx", specifiedWidth + specifiedMargin + specifiedWidth / 2)
        .attr("cy", specifiedWidth / 2)
        .attr("r", specifiedWidth / 2)
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    svg.append("rect")
        .attr("x", specifiedWidth * 2 + specifiedMargin * 2)
        .attr("y", initialPoint)
        .attr("width", specifiedWidth)
        .attr("height", specifiedWidth)
        .style("stroke-width", 2)
        .style("fill", "none")
        .attr("stroke", "steelblue")
        .attr("rx", "5px")
        .attr("ry", "5px");
    svg.append("polygon")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("points", (specifiedWidth * 3 + specifiedMargin * 3) + "," + height + ", "+
                        (specifiedWidth * 3 + specifiedMargin * 4) + "," + initialPoint + ", "+
                        (specifiedWidth * 4 + specifiedMargin * 3) + "," + height);

};

window.onload = createShapes();
