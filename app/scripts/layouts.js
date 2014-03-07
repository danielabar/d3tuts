// Layout: mechanism for D3 to convert data to something more useful

var diameter = window.innerHeight;

var svg = d3.select('div.container').append('svg').attr({
  width: window.innerWidth,
  height: window.innerHeight
  }).append('g');