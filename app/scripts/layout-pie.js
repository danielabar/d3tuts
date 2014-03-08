// A simple dataset
var dataset = [5, 10, 20, 45, 6, 25];

var w = window.innerWidth;
var h = window.innerHeight;

var outerRadius = w / 2;
var innerRadius = w / 5;

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

// Define a pie layout
var pie = d3.layout.pie();

// Ordinal scale with an output range of 10 different colors
var color = d3.scale.category10();

// Create the SVG element
var svg = d3.select('div.container')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// Setup groups
var arcs = svg.selectAll('g.arc')
  .data(pie(dataset))
  .enter()
  .append('g')
  .attr('class', 'arc')
  .attr('transform', 'translate(' + outerRadius + ', ' + outerRadius + ')');

// Draw arc paths
arcs.append('path')
  .attr('fill', function(d, i) {
    return color(i);
  })
  .attr('d', arc);

// Generate text labels for each wedge
arcs.append('text')
  .attr('transform', function(d) {
      return 'translate(' + arc.centroid(d) + ')';
  })
  .attr('text-anchor', 'middle')
  .attr('fill', 'white')
  .attr('class', 'pie-text')
  .text(function(d) {
    return d.value;
  });