var w = window.innerWidth;
var h = window.innerHeight;
var margin = { top: 40, right: 20, bottom: 20, left: 40};
var radius = 6;

var svg = d3.select('div.container').append('svg').attr({
  width: w,
  height: h
});

// This data represents plotted points
var data = [
  { x:100, y: 110 },
  { x:83, y: 43 },
  { x:92, y: 28 },
  { x:49, y: 74 },
  { x:51, y: 10 },
  { x:25, y: 98 },
  { x:77, y: 30 },
  { x:20, y: 83 },
  { x:11, y: 63 },
  { x:4, y: 55 },
  { x:0, y: 0 },
  { x:85, y: 100 },
  { x:60, y: 40 },
  { x:70, y: 80 },
  { x:10, y: 20 },
  { x:40, y: 50 },
  { x:25, y: 31 }
];

// Domains and axes are strongly linked together

// Scale the x and y values to make the visualization more pleasing
// Note passing a function to d3.max telling it which data property to be considered for max value
// Add 10 to domain max value to provide "breathing room" to values near the edges
var xScale = d3.scale.linear()
  .domain([0, d3.max(data, function(d) { return d.x; } ) + 10])
  .range([margin.left, w - margin.right]);

var yScale = d3.scale.linear()
  .domain([0, d3.max(data, function(d) { return d.y; } ) + 10])
  .range([margin.top, h - margin.bottom]);

// Create the x and y axes - need to tell each axis what scale to use
// orient top means the marker ticks (10, 20, etc) will be drawn ABOVE the axis line
// Can specify tickPadding (default is 3) - space between tick and number
// Can specify tickSize to set height of ticks themselves
var xAxis = d3.svg.axis().scale(xScale).orient('top').tickPadding(10);
var yAxis = d3.svg.axis().scale(yScale).orient('left').tickSize(20);

// By default, d3 will place ticks where it thinks it makes sense
// given the data (eg: 10, 20, etc).
// But can override this behaviour by specifying tickValues:
// var xAxis = d3.svg.axis().scale(xScale).orient('top').tickValues([0, 13, 43, 85, 110]);

// Can also use a function over each data element to set tickValues
// var xAxis = d3.svg.axis().scale(xScale).orient('top')
//   .tickValues(data.map(function(d) { return d.x; } ));

// Put the axes on the screen - use 'g' for group element
// Group elements are invisible elements, act as grouping for other elements
// use array in transform to make string concatenation easier
// call the xAxis function on this group element
// Note that the min/max axis values match the min/max of scale function domain
svg.append('g').attr({
  'class': 'axis',
  transform: 'translate(' + [0, margin.top] + ')'
}).call(xAxis);

svg.append('g').attr({
  'class': 'axis',
  transform: 'translate(' + [margin.left, 0] + ')'
}).call(yAxis);

// Create the visualization
svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr({
    cx: function(d) { return xScale(d.x); },
    cy: function(d) { return yScale(d.y); },
    r: radius
  });