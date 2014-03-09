# Formatting Numbers

Use ```d3.format``` method, which returns a function that can then be used to format numbers.

```javascript

// first character is padding character, often would be space, but using underscore so can see it in action
// if first character is padding, then next character MUST set alignment
// '<' bracket means align left, '>' means align right, '^' means align middle
// next character specifies how wide string should be
var f = d3.format('_<20');

// Now we can use the format function f:
f(100);   // "100_________________"

// Another example, without assigning to variable 'f'
// Use space character padding, align right, 20 spaces, apply to 100
d3.format(' ^20')(100);   // "         100        "

// To indicate character for sign, insert ' ', '+', '-' after align and before number of chars
d3.format(' >-20')(100);    // "                -100"
d3.format(' >+20')(100);    // "                +100"
d3.format(' > 20')(100);    // "                 100"

// Thousands separator
d3.format(' >+20')(1003);   // "               +1003"
d3.format(' >+20,')(1003);  // "              +1,003"

// Precision
// Only works for certain types, eg 'f' for floating point
d3.format(' >+20,.4f')(1003);       // "         +1,003.0000"
d3.format(' >+20,.3f')(1003.14159); // "         +1,003.142"

// Octal
d3.format('o')(8);    // "10"

// Binary
d3.format('b')(10)    // "1010"

// Hexadecimal - lower
d3.format('x')(10)    // "a"

// Hexadecimal - upper
d3.format('X')(10)    // "A"

// Get character for a number
d3.format('c')(65)    // "A"
```

## Format Summary

Important to specify format options in correct order

```javascript
d3.format("fill align sign width comma .precision type");
```