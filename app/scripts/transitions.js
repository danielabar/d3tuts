var w = window.innerWidth;
var h = window.innerHeight;
var margin = { top: 40, right: 20, bottom: 20, left: 40};
var radius = 6;

var svg = d3.select('div.container').append('svg').attr({
  width: w,
  height: h
});

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

var xScale = d3.scale.linear()
  .domain([0, d3.max(data, function(d) { return d.x; } ) + 10])
  .range([margin.left, w - margin.right]);

var yScale = d3.scale.linear()
  .domain([0, d3.max(data, function(d) { return d.y; } ) + 10])
  .range([margin.top, h - margin.bottom]);

var xAxis = d3.svg.axis().scale(xScale).orient('top');
var yAxis = d3.svg.axis().scale(yScale).orient('left');

// This describes a circle at top left corner with radius of 1
var circleInitialAttrs = {
  cx: xScale(0),
  cy: yScale(0),
  r: 1,
  fill: 'red'
};

var circleAttrs = {
  cx: function(d) { return xScale(d.x); },
  cy: function(d) { return yScale(d.y); },
  r: radius,
  fill: 'black'
};

var mouseOverHandler = function(d, i) {
  d3.select(this).attr({
    fill: 'orange',
    r: radius * 2
  });
  svg.append('text')
    .attr({
      id: 't' + d.x + '-' + d.y + '-' + i,
      x: function() { return xScale(d.x) - 30 ; },
      y: function() { return yScale(d.y) - 15 ; }
    })
    .text(function() {
      return [d.x, d.y];
    });
};

var mouseOutHandler = function(d, i) {
  d3.select(this).attr({
    fill: 'black',
    r: radius
  });
  d3.select('#t' + d.x + '-' + d.y + '-' + i).remove();
};

var xAxisGroup = svg.append('g').attr({
  'class': 'axis',
  transform: 'translate(' + [0, margin.top] + ')'
}).call(xAxis);

var yAxisGroup = svg.append('g').attr({
  'class': 'axis',
  transform: 'translate(' + [margin.left, 0] + ')'
}).call(yAxis);

// Transition all circles from 0,0 to their data points
// First create circles with initial attributes, and get a reference to them with var 'circles'
var circles = svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr(circleInitialAttrs)
  .on('mouseover', mouseOverHandler)
  .on('mouseout', mouseOutHandler);

// Now transition all the circles to their new positions
// Pass a function to delay to stagger the transitions,
// (otherwise circles all bounce at once and look like they're attached)
circles.transition()
  .delay(function(d, i) {
    // first circle will be not delayed (0*100=0)
    // second circle will be delayed by 100ms (1*100=100)
    // third circle will be delayed by 2*100=200ms
    // etc.
    return i * 100;
  })
  .duration(1000)
  .ease('elastic')
  .attr(circleAttrs);

  svg.on('click', function() {
    var coords = d3.mouse(this);
    var newData = {
      x: Math.round(xScale.invert(coords[0])), // every scale has invert method to put things "backwards"
      y: Math.round(yScale.invert(coords[1]))
    };
    data.push(newData);

    // user might have clicked right on edge of graph, therefore we
    // should update the domain to include a potentially new max value
    // (recall the axes are made intentionally larger than max for breathing room)
    xScale.domain([0, d3.max(data, function(d) { return d.x; } ) + 10]);
    yScale.domain([0, d3.max(data, function(d) { return d.y; } ) + 10]);

    // After the scales are updated with new domains,
    // will also need to update the axes, circles, and text
    xAxisGroup.transition().call(xAxis);
    yAxisGroup.transition().call(yAxis);

    // For the newly created circle, transition it from
    // a starting to ending point.
    // Assign this expression to a variable 'c', so it can be transitioned later
    var c = svg.selectAll('circle').data(data);

    // Animate circles that were already placed to their new positions relative to new axes
    c.transition()
      .ease('elastic')
      .attr(circleAttrs);

    c.enter()
      .append('circle')
      .attr(circleInitialAttrs)
      .on('mouseover', mouseOverHandler)
      .on('mouseout', mouseOutHandler);

      // Transition the attributes from 0,0 to new attributes
      // Use duration method to control timing of the transition
      c.transition()
        // .delay(500) // from the time transition is triggerred, pause .5s before start transition
        .duration(1000) // 1000ms = 1s
        .ease('elastic') // bounce in effect
        .attr(circleAttrs);
  });