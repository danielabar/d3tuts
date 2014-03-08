// Layout: mechanism for D3 to convert data to something more useful

var radius = window.innerHeight;

var svg = d3.select('div.container').append('svg')
  .attr({
    width: window.innerWidth,
    height: window.innerHeight
  }).append('g')
  .attr('transform','translate(' + [50, radius/2] + ')rotate(60)');

// Create a layout function
// size takes an array
//  first element is degrees, where 360 would be a full radial tree
//  second element is radius for circle
// tree layout converts data that doesn't have explicit position to
//  values that can be laid out relative to eachother (eg: parent->child)
var tree = d3.layout.tree().size([60, radius]);

// layouts often used in conjunction with shape generator
// tree layout has individual nodes with lines between the nodes
// diagonal will be used to give lines a nice comfortable curve
// projection is to define betinnign and ending points of curves
var diagonal = d3.svg.diagonal.radial()
  .projection(function (d) {
    // d.y,d.x is default, except we need to convert d.x to degrees for curves
    return [d.y, d.x / 180 * Math.PI];
  });

// Now load the data
d3.json('/data/lang.json', function(data) {

  // data was not in array form, but this will convert it to array
  var nodeData = tree.nodes(data);
  // console.table(nodeData);

  var linkData = tree.links(nodeData);
  // console.dir(linkData);

  // draw links
  svg.selectAll('path.link')
    .data(linkData)
    .enter()
    .append('path')
    .attr({
      'class': 'link',
      fill: 'none',
      stroke: '#ccc',
      d: diagonal
    });

  // draw nodes: use group element because we want circle and text together
  var nodes = svg.selectAll('g.node')
    .data(nodeData)
    .enter()
    .append('g')
    .attr({
      'class': 'node',
      'transform': function(d) {
        return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')';
      }
    });

  // append circles to the nodes
  nodes.append('circle')
    .attr({
      fill: '#fff',
      stroke: '#78B446',
      'stroke-width': 4,
      r: 4
    });

  // append text to each node
  // dx adjusts pixes over to the right
  nodes.append('text')
    .attr('dx', 15)
    .text(function(d) {
      return d.name;
    });

});