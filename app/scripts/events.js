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

// make circle attributes a re-usable object (for future updates)
var circleAttrs = {
  cx: function(d) { return xScale(d.x); },
  cy: function(d) { return yScale(d.y); },
  r: radius
};

svg.append('g').attr({
  'class': 'axis',
  transform: 'translate(' + [0, margin.top] + ')'
}).call(xAxis);

svg.append('g').attr({
  'class': 'axis',
  transform: 'translate(' + [margin.left, 0] + ')'
}).call(yAxis);

// SVG elements can listen for browser events, just like any other DOM element
// Let's add event for showing x/y co-ordinates as user hovers over a point
// 'on' is used to register the event listener with d3
// function will receive reference to data element 'd' and data index 'i'
svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr(circleAttrs)
  .on('mouseover', function(d, i) {
    // 'this' is the element that was moused over, but its a raw DOM node
    // wrap it with d3.select to make it a d3 element.
    // Note that changing fill color is a poor example of event usage
    // because many svg properties can be styled with css.
    // Note that not every svg property can be changed with css, eg: radius
    // This is when javascript event handling should be used
    d3.select(this).attr({
      fill: 'orange',
      r: radius * 2
    });
    // Also want to display some text
    // Note x/y pos function do not take 'd' parameter because its not bound to any data
    // However, we have access to 'd' from mouseover function via closure
    svg.append('text')
      .attr({
        id: 't' + d.x + '-' + d.y + '-' + i,  // assign an id so text element can later be found for removal
        x: function() { return xScale(d.x) - 30 ; }, // subtract 30 from x position to move text to left of circle
        y: function() { return yScale(d.y) - 15 ; }  // subtract 15 from y position to move text above circle
      })
      .text(function() {
        return [d.x, d.y]; // string concatenation shortcut: pass array and get string with comma separating the values
      });
  })
  // Need to explicitly handle mouseout to put the circles back to their
  // original radius and color.
  .on('mouseout', function(d, i) {
    d3.select(this).attr({
      fill: 'black',
      r: radius
    });
    // Also need to remove the text we added
    d3.select('#t' + d.x + '-' + d.y + '-' + i).remove();
  });

  // Add new element when user clicks somewhere in visualization
  // d3 provides convenience methods to find where user clicked
  svg.on('click', function() {

    // get pixel position where user clicked
    // coords is array where 0th element is x pos and 1st element is y pos
    var coords = d3.mouse(this);

    // define a new data item
    var newData = {
      x: Math.round(xScale.invert(coords[0])), // every scale has invert method to put things "backwards"
      y: Math.round(yScale.invert(coords[1]))
    };

    // add the new data to existing data
    data.push(newData);

    // now need to UPDATE the visualization
    // we'll be 1 circle short, so need to append it
    // to get the mouseover effect, need to bind events also to this new circle
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr(circleAttrs);
  });