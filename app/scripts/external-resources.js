// d3.xhr to make ajax request, but also have convenience methods:

// d3.text
// d3.json
// d3.html
// d3.xml
// d3.csv
// d3.tsv

// all take file path and callback
// need a server running to use xhr

d3.csv('/data/sales.csv', function(d) {
  console.table(d);
  // Now that we have the data, make a simple visualization
  // Notice the csv header row is available as the data attributes
  d3.select('div.container').selectAll('p')
    .data(d)
    .enter()
    .append('p')
    .text(function(d) {
      return d.name + ' - ' + d.sales;
    });
});