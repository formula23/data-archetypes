module.exports.run = function(callback) {

	/**
	 * Test Receipt Archetype
	 */
	var ZSchema = require("z-schema");
	var validator = new ZSchema();
	var test = require('tape');
	var DataArchetypes = require('../index');
	var DATs = new DataArchetypes();

	/**
	 * Receipt Archetype Schema Test
	 */

	test('****** Test Receipt Archetype Schema', function(t) {
		validator.validateSchema(DATs.schemas.receipt, function(err, report) {
			t.equal(report.valid, true, 'No schema formatting errors');
			t.end();
		});
	});

}