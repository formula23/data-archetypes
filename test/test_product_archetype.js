module.exports.run = function(callback) {

	/**
	 * Test Product Archetype
	 */
	var ZSchema = require("z-schema");
	var validator = new ZSchema();
	var test = require('tape');
	var DataArchetypes = require('../index');
	var DATs = new DataArchetypes();

	/**
	 * Product Archetype Schema Test
	 */

	test('****** Test Product Archetype Schema', function(t) {
		validator.validateSchema(DATs.schemas.product, function(err, report) {
			t.equal(report.valid, true, 'No schema formatting errors');
			t.end();
		});
	});

	/**
	 * Product Instance Test
	 */
	test('------ Test Product Instance', function(t) {

		var instance = DATs.newProduct();

		DATs.validateProduct(instance, function(errors, product) {
			t.equal(errors, null);
			t.end();
		});
	});


	/**
	 * Product Validator Tests
	 */

	test('------ Test Validator - Empty Object', function(t) {

		var instance = {};

		DATs.validateProduct(instance, function(errors, product) {
			t.equal(errors.schema, 'Product Instance is empty', 'Error saying instance is empty');
			t.end();
		});
	});

	test('------ Test Validator - Missing Title, Price, Seller', function(t) {

		var instance = {
			brand: 'Mercedes'
		};

		DATs.validateProduct(instance, function(errors, product) {
			t.equal(errors.title, 'Title is required', 'Error saying title is required');
			t.equal(errors.price, 'Price is required', 'Error saying price is required');
			t.equal(errors.seller, 'Seller is required', 'Error saying seller is required');
			t.end();
		});
	});

	test('------ Test Validator - Invalid Formats', function(t) {

		var instance = {
			title: 1234,
			price: '1234',
			seller: ['store1', 'store2'],
			category: 1313,
			subcategory: 2134908124,
			condition: 123123,
			description: 1242,
			tags: 'asfasf',
			audience: 'asfasf',
			brand: 234214,
			model: 23412412,
			currency: 8214124,
			recurring_payment: 987,
			payment_interval: 09821,
			sale: 2214,
			sale_price: 'afasflj',
			in_stock: 987,
			sku: 987908,
			upc: 980921,
			shipping_prices: 97974
		};

		DATs.validateProduct(instance, function(errors, product) {
			t.equal(typeof errors.title !== 'undefined', true);
			t.equal(typeof errors.price !== 'undefined', true);
			t.equal(typeof errors.seller !== 'undefined', true);
			t.equal(typeof errors.category !== 'undefined', true);
			t.equal(typeof errors.subcategory !== 'undefined', true);
			t.equal(typeof errors.condition !== 'undefined', true);
			t.equal(typeof errors.description !== 'undefined', true);
			t.equal(typeof errors.tags !== 'undefined', true);
			t.equal(typeof errors.audience !== 'undefined', true);
			t.equal(typeof errors.brand !== 'undefined', true);
			t.equal(typeof errors.model !== 'undefined', true);
			t.equal(typeof errors.currency !== 'undefined', true);
			t.equal(typeof errors.recurring_payment !== 'undefined', true);
			t.equal(typeof errors.payment_interval !== 'undefined', true);
			t.equal(typeof errors.sale !== 'undefined', true);
			t.equal(typeof errors.sale_price !== 'undefined', true);
			t.equal(typeof errors.in_stock !== 'undefined', true);
			t.equal(typeof errors.sku !== 'undefined', true);
			t.equal(typeof errors.upc !== 'undefined', true);
			t.equal(typeof errors.shipping_prices !== 'undefined', true);
			t.end();
			// Test Callback
			callback();
		});
	});

}