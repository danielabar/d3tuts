# Tuts Plus: Beautiful Data with D3

## Working with Elements
```
d3 object is similar to jquery, glorified dom element
d3.select("body");
d3.selectAll("body");

var body = d3.select("body"); // now all d3 methods are available on body

body.append("h1").text("Hello D3");

var h1 = body.select("h1");

// pass key-value
h1.attr({"id", "heading"});

// pass object
h1.attr({ id: "something", "class": "my-class"})

h1.style({ "font-family": "sans-serif", color: "blue"})

// set or remove classes
h1.classed("another-class", true); // add class
h1.classed("my-class", false); // remove class

h1.html("<span> Hello </span> D3!");
h1.text("<span>Hello</span");

body.insert("p", "script");

h1.remove(); // remove element entirely from dom
```
