# Color Functions

## d3.rgb

Red, Green, Blue

Can pass individual RGB values, or hex like in CSS

```javascript
d3.rgb(12, 67, 199);  // d3_Rgb {r: 12, g: 67, b: 199, brighter: function, darker: function…}
db.rgb('#ffffff');    // d3_Rgb {r: 255, g: 255, b: 255, brighter: function, darker: function…}
```

## d3.hsl, hcl, lab

Alternate ways of defining color.
Hue, Saturation, Lightness
Hue, Chroma, Luminess

### Using Color

```javascript

// Define a blue color
var a = d3.rgb(54, 100, 219);

// Set the body background color
d3.select('body').style('background-color', a);

// Brighten the color
var a1= a.brighter();
d3.select('body').style('background-color', a1);

// Darken the color
var a2 = a.darker();
d3.select('body').style('background-color', a2);

// Controler how much brighter/darker
a.darker(0.1);

// Get the hex value
a.toString(); // "#3664db"

// d3 has built in color schemes

// category10 is a group of 10/ colors that D3 thinks go well together
var color10 = d3.scale.category10();

// category20 is like category10 but dark/light version of each color
var color20 = d3.scale.category20();

// category20b is a variation on category20, 4 versions of each color from dark to light
var color20b = d3.scale.category20b();

// yet another variation
var color20c = d3.scale.category20b();

```
