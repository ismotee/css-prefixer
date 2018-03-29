'use strict';

var fs = require('fs');

var content = fs.readFileSync('ol.css').toString();
var prefix = ".smde";

// functionality starts here
var temp = [];
var mode = "add";
var lastAdd = 0;
for (var i = 0; i < content.length; i++) {
  var char = content.charAt(i);

  if (char === '}') {
    mode = "add";
  }
  if (char === '.') {
    if (mode === "add") {
      temp.push(content.substr(lastAdd, i - lastAdd));
      console.log(temp);
      lastAdd = i;
      mode = "read-with-care";
    }
  }
  if (char === '{') {
    mode = "read";
  }
  if (mode === "read-with-care") {
    if (char === ',') {
      mode = "add";
    }
  }
}
temp.push(content.substr(lastAdd, content.length - lastAdd));
var output = temp.join(prefix + " ");
fs.writeFileSync("output.css", output);
