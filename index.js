/**
 *  Data Archetypes – JSON standards for common types of data
 */

var productValidator = require('.archetypes/product/product_archetype_validator');
var productInstance = require('.archetypes/product/product_archetype_instance');

// Constructor
function DataArchetypes() {
	// Add Schemas
	this.schemas = {};
	this.schemas.product = require('./product/product_archetype_schema');
	this.schemas.receipt = require('./receipt/receipt_archetype_schema');
};

// Add Methods
DataArchetypes.prototype.newProduct = function() {
	return productInstance;
};

DataArchetypes.prototype.validateProduct = function(product, callback) {
	productValidator.validate(product, callback, function(errors, product) {
		callback(errors, product);
	});
};

module.exports = DataArchetypes;
