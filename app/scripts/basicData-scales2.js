var svg = d3.select('div.container').append('svg').attr({
  width: window.innerWidth,
  height: window.innerHeight
});

var padding = 10;
var radius = 4;
var data = d3.range(100); // 0, 1, 2, ... 99

// Make x value change exponentially
// var cxScale = d3.scale.pow().exponent(2) // y = mx^2 + b
var cxScale = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([padding + radius/2, window.innerWidth - padding - radius/2]);

// Make y value change exponentially
// var cyScale = d3.scale.pow().exponent(2)
// Also have square root scale
var cyScale = d3.scale.sqrt(2) // equivalent to pow().exponent(0.5)
  .domain([0, d3.max(data)])
  .range([window.innerHeight - padding - radius/2, padding + radius/2]);

// also have logarithmic scales

// Now create the visualization
svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr({
    cx: cxScale,
    cy: cyScale,
    r: radius
  });