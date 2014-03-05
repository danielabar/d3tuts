// Ordinal scales have a finite domain, a discrete set of items
// (as opposed to continuous scales)

var svg = d3.select('div.container').append('svg').attr({
  width: window.innerWidth,
  height: window.innerHeight
});

// This data contains discrete/ordinal values
// Notice that this data is not strictly numeric, we have objects here
var data = [
  { grade: 'A+' },
  { grade: 'B' },
  { grade: 'A' },
  { grade: 'B-' },
  { grade: 'A' },
  { grade: 'B+' },
  { grade: 'A-' }
];

// Visualization that converts above grades to numbers
var gradeScale = d3.scale.ordinal()
  .domain(['A+', 'A', 'A-', 'A', 'B+', 'B', 'B-']) // must tell D3 exactly what's in the domain
  .range([100, 89, 84, 79, 76, 72]); // specify which numbers go with which letters

// grade values are close together, so visualization will be scrunched,
// add another scale to space things out:
var scale = d3.scale.linear()
  .domain([72, 100])
  .range([20, 520]);

// Alphabetic grade is converted to numeric grade, then scaled appropriately for display
svg.selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .attr({
    'text-anchor': 'middle',
    'font-size': 20,
    x: function(d) { return scale(gradeScale(d.grade)); },
    y: function(d) { return scale(gradeScale(d.grade)); }
  })
  .text(function(d) {
    return d.grade;
  });