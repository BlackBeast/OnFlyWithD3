var drawPie = function(){
  var data = [1, 1, 2, 2, 1, 2, 1];

  var width = 500;
  var height = 500;
  var radius = Math.min(width, height) / 2;

  var color = d3.scaleOrdinal(d3.schemeCategory20);
  let translate = (x, y) => (`translate (${x}, ${y})`);

  var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', translate(width/2,height/2));


    d3.select("body").attr("align","center");

  var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  var pie = d3.pie().sort(null);

  pie.endAngle(function(){ return Math.PI;});

  var path = svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d, i) {
      return color(i);
    });
}

window.onload = drawPie;
