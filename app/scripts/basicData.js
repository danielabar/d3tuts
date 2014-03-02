var dataset = [8, 48, 14, 31, 23];

svg = d3.select('div.container').append('svg').attr({
	width: 600,
	height: 400
});

/*
 create a rectangle for each element in dataset (i.e. data binding)
 x function gets reference to data 'd' and index 'i'
 height function gets reference to data 'd'
*/
svg.selectAll('rect')
	.data(dataset)
	.enter()
	.append('rect')
	.attr({
		x: function(d, i) { return i * 101; },
		y: function(d, i) { return 400 - (d * 5); },
		width: 100,
		height: function(d) { return d * 5; },
		fill: 'orange'
	});