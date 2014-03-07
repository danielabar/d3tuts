var svg = d3.select('div.container').append('svg')
  .attr({
    width: window.innerWidth,
    height: window.innerHeight
  });

// format a date, in this case full year
var parse = d3.time.format('%Y').parse;

// csv function accepts a second function arg that can re-format the data
// in this case, we'd like to convert year number from tuts.csv to
// an actual JavaScript Date object
// second function MUST return something, that will get passed to third arg
d3.csv('/data/tuts.csv', function(d) {d.year = parse(d.year); return d;}, function(data) {
  console.table(data);
  console.dir(data);

  // create a year scale (i.e. x coordinate scale)
  // need d3's time scale feature - takes JavaScript Date objects instead of numbers
  // going to create dots connected by lines, i.e. a line graph
  var yearScale = d3.time.scale()
    // extent returns array with min and max from input
    .domain(d3.extent(data, function(d) {return d.year;} ))
    .range([50, window.innerWidth - 50]);

  var numberScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.number; })])
    .range([50, window.innerHeight - 50]);

  var yearAxis = d3.svg.axis().scale(yearScale)
    .tickSize(100 - window.innerHeight) // reverse direction that ticks are produced in
    .orient('bottom');

  svg.append('g')
    .attr({
      'class': 'axis',
      'transform': 'translate(' + [0, window.innerHeight - 50] + ')',
    }).call(yearAxis);

  // create a horizontal line across top of the chart
  svg.append('line')
    .attr({
      x1: 50,
      y1: 50,
      x2: window.innerWidth - 50,
      y2: 50,
      fill: 'none',
      stroke: '#474747'
    });

  // define a line with functions specifying how to calculate each x/y co-ordinate
  // notice the x/y functions are the same as cx/cy functions used for circles
  var line = d3.svg.line()
    .x(function(d) { return yearScale(d.year); })
    .y(function(d) { return window.innerHeight - numberScale(d.number); });

  // Now construct a path element using line definition above
  // data is put in array so that it will be treated as a single data element
  svg.append('path')
    .data([data])
    .attr({
      d: line,
      fill: 'none',
      stroke: '#78B446',
      'stroke-width': 4
    });

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr({
      cx: function(d) { return yearScale(d.year); },
      cy: function(d) { return window.innerHeight - numberScale(d.number); },
      r: 4,
      fill: '#fff', // fill is white because we're going to use a stroke
      stroke: '#788446', // nice shade of green
      'stroke-width': 4 // property stroke-width must be in quotes because it has a hyphen
    });
});
