// Dependencies
var async = require('async');

// Require Tests
var test_product_archetype = require('./test_product_archetype');
var test_receipt_archetype = require('./test_receipt_archetype');

// Test Array
var tests = [
	test_product_archetype,
	test_receipt_archetype
];

// Perform Tests
async.eachSeries(tests, function(test, testCallback) {
	test.run(function() {
		testCallback();
	});
}, function() {
	console.log("****** Tests Completed ******");
});