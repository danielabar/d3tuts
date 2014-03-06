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
  // need d3's time scale feature
  // going to create dots connected by lines
  var yearScale = d3.time.scale()
    .domain(d3.extent(data, function(d) {return d.year;} )) // extent returns array with min and max from input
    .range(50, window.innerWidth - 50);

  var numberScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.number; })])
    .range(50, window.innerHeight - 50);

  // not working for me, getting NaN from yearScale and numberScale
  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr({
      cx: function(d) { return yearScale(d.year); },
      cy: function(d) { return window.innerHeight - numberScale(d.number); },
      r: 4,
      fill: '#fff', // white because we're going to use a stroke
      stroke: '#788446',
      'stroke-width': 4
    });
});