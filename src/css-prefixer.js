const fs = require('fs');

const func = (content, prefix) => {
  let temp = [];
  let mode = "add";
  let lastAdd = 0;
  for (let i = 0; i < content.length ; i++) {
    let char = content.charAt(i);
    if(char === '}') {
      mode = "add";
    }
    if(char === '.') {
      if(mode === "add") {
        temp.push(content.substr(lastAdd, i - lastAdd));
        lastAdd = i;
        mode = "read-with-care";
      }
    }
    if(char === '{') {
      mode = "read";
    }
    if(mode === "read-with-care") {
      if(char === ',') {
        mode = "add";
      }
    }
  }
  temp.push(content.substr(lastAdd,content.length - lastAdd));
  return temp.join(prefix + " ");
}; 

let content = fs.readFileSync('ol.css').toString();
const prefix = ".valaaOl";

fs.writeFileSync("output.css", func(content, prefix));
