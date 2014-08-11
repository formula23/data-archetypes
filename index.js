/**
 *  Data Archetypes – JSON standards for common types of data
 */

var productValidator = require('./product/product_archetype_validator');

// Constructor
function DataArchetypes() {
	// Add Schemas
	this.schemas = {};
	this.schemas.product = require('./product/product_archetype_schema');
	this.schemas.receipt = require('./receipt/receipt_archetype_schema');
};

DataArchetypes.prototype.validateProduct = function(product, callback) {
	productValidator.validate(product, callback, function(errors, product) {
		callback(errors, product);
	});
};

module.exports = DataArchetypes;
