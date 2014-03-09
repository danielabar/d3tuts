var svg = d3.select('div.container').append('svg')
  .attr({
    width: window.innerWidth,
    height: window.innerHeight
  });

var data = d3.range(20);

// Create a color scale
// category10 is a group of 10 colors that D3 thinks go well together
var color = d3.scale.category10();

// We'll need the bar width in multiple places
var barWidth = window.innerWidth / data.length;

// experiment with color transition
var rectInitialAttrs = {
  width: 0,
  height: 0,
  y: 0,
  x: function(d, i) {
    return barWidth * i;
  },
  fill: 'black'
};

var rectFinalAttrs = {
  width: barWidth,
  height: window.innerHeight,
  y: 0,
  x: function(d, i) {
    return barWidth * i;
  },
  fill: color
};

// Transition rects from white to 10color scale
var colorRects = svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr(rectInitialAttrs);

colorRects.transition()
  .delay(function(d, i) {
    return i * 100;
  })
  .duration(1000)
  .ease('cubic')
  .attr(rectFinalAttrs);


// 10 colors across 20 bars, each color will be repeated twice
// svg.selectAll('rect')
//   .data(data)
//   .enter()
//   .append('rect')
//   .attr({
//     width: barWidth,
//     height: window.innerHeight,
//     y: 0, // because we don't want bars moving down at all
//     x: function(d, i) {
//       return barWidth * i;
//     },
//     fill: color
//   });