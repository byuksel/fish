/**
 * CSV library for csv manipulations.
 */
// Expose dict
exports = module.exports = csv;

function csv() {}

// Produces the JSON of the csvdata.
// Ex. Given csvdata of:
// { column_names: { "magician", "born"},
//   rows: { { "houdini", 1874 },
//           { "copperfield", 1956} }
// }
//
// toJSON() will produce:
//
//   {
//      "magician":"houdini",
//      "born": 1874
//   },
//   {
//       "magician":"copperfield",
//       "born":1956
//   }
csv.prototype.toJSON = function(csvdata) {
  var jsondata = '';
  var columnames = csvdata.getColumnNames();
  var rows = csvdata.getRows();
  var output = '';
  for (var i = 0; i < rows.length; i++) {
    output += '{';
    for (var j = 0; j < rows[i].length; j++) {
      output += '\n';
      var entry = columnnames[i] + ':' + rows[i][j];
      output += '  ' + entry + ',';
    }
    if (rows[i].length > 0) {
      // remove the last ","
      output = output.slice(0, -1);
    }
    output += '\n},';
  } 
  if (rows.length > 0) {
    // remove the last ","
    output = output.slice(0, -1);
  }
  return output;
};

