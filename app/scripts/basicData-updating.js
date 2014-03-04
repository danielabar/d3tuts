svg = d3.select('div.container').append('svg').attr({
  width: 1000,
  height: 400
});

// range makes dataset on the fly, in this case [0, 1, 2, 3, 4]
// selectAll: make selection
// data: bind selection
// enter: create placeholders for new elements coming in to the screen
// append: add new elements
// attr: style new elements that were added
svg.selectAll('rect')
  .data(d3.range(5))
  .enter()
  .append('rect')
  .attr({
    width: 100,
    height: 100,
    y: 100,
    x: function (d, i) { return i * 101; },
    fill: '#474747'
  });

var moreData = d3.range(10);
var rects = svg.selectAll('rect').data(moreData);

// at this point we still only see 5 rectangles
rects.attr('fill', '#ccc');

// now we're going to create those other 5 rectangles we don't have yet
rects.enter()
  .append('rect')
  .attr({
      width: 50,
      height: 50,
      y: 100,
      x: function (d, i) { return i * 101; },
      fill: 'lightblue'
  });