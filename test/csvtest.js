/*jshint expr: true*/
var fish = require('../fish'),
    csvdata = fish.csvdata,
    csv = fish.csv;

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var csv = new csv();
describe('fish.csv browserified tests', function() {

  it('should parse csvdata', function() {
    var data = new csvdata();
    var rows = data.getRows();
    rows.push('yoga');
    var testrows = data.getRows();
    expect(rows).to.equal(testrows);
  });

  it('should use chai coz it\'s so tasty', function() {
    expect(3).to.equal(3);
  });
});
