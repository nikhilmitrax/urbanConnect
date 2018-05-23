console.log("Index")

var fs = require('fs'); 
var parse = require('csv-to-object');

data = fs.readFileSync("gaze.csv", 'utf-8')
// console.log(data)
// data = data.split('\n')

obj = parse({
    dilemeter: ',',
    textQualifier: '"',
    string: data
});



console.log(obj[0])