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

// 10 colors across 20 bars, each color will be repeated twice
svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr({
    width: barWidth,
    height: window.innerHeight,
    y: 0, // because we don't want bars moving down at all
    x: function(d, i) {
      return barWidth * i;
    },
    fill: color
  });