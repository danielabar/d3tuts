var svg = d3.select('div.container').append('svg').attr({
  width: window.innerWidth,
  height: window.innerHeight
});

// The difference between these is quite small
// Using these values directly as height will result in bars that barely look different
var data = [1, 5, 2, 4, 3, 8, 0.5];

// Solution is to use d3 scales, in this case:
// Mapping any value between 0 and 10, to a range between 0 and window height - 40
// Using linear scale means y = mx + b
var heightScale = d3.scale.linear()
  .domain([0, 10])
  .range([0, window.innerHeight - 40]);

// To take up as much space as possible use dynamic instead of static domain
var heightScaleDynamic = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, window.innerHeight - 40]);

// use d3.scale.linear.clamp(true) to prevent scale function from calculating out of min/max range

// scales can also interpolate string values
var colorScale = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range(['green', 'red']);

// could also have range like:
//  .range(['0px', '100px'])
//  .range(['$0', '$100'])

// Use heightScale function defined above in the visualization
// Use colorScale for fill color
svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr({
    width: 100,
    // height: function(d) { return heightScale(d); },
    // Optimization, don't need to explicitly pass d
    height: heightScaleDynamic,
    x: function(d, i) { return i * 101; },
    y: 20,
    fill: colorScale
  });