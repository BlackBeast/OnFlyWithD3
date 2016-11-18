let createDonut = function(){
  let data = [1, 1, 2, 2, 1, 2, 1];

  let width = 500;
  let height = 500;
  let donutWidth = 150;
  let radius = Math.min(width, height) / 2;

  let color = d3.scaleOrdinal(d3.schemeCategory20);
  let translate = (x, y) => (`translate (${x}, ${y})`);

  let svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', translate(width/2,height/2));

    d3.select("body").attr("align","center");

  let arc = d3.arc()
    .innerRadius(donutWidth)
    .outerRadius(radius);

  let pie = d3.pie().sort(null);
  pie.endAngle(function(){ return Math.PI;});

  let path = svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d, i) {
      return color(i);
    });
}

window.onload = createDonut;
