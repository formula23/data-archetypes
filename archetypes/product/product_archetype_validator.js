/**
 * Clean, comprehensible validator for the Product Archetype
 */

var Utils = require('../../utils');
var ProductArchetypeSchema = require('./product_archetype_schema');

exports.validate = function(product, callback) {

    // Defaults
    var errors = {};

    /**
     * Check if instance is empty object
     */
    var keys = Object.keys(product);
    if (keys.length === 0) {
        errors.schema = 'Product Instance is empty';
        return callback(errors, null);
    }

    /**
     * title
     */
    if (Utils.whatIs(product.title) === 'undefined') {
        errors.title = 'Title is required';
    } else if (!Utils.isString(product.title)) {
        errors.title = 'Title must be a string';
    } else if (product.title.length > 140) {
        errors.title = 'Title cannot be longer than 140 characters';
    } else {
        // Sanitize
        product.title = product.title.toString().replace(/\s{2,}/g, ' ');
    }

    /**
     * price
     */
    if (Utils.whatIs(product.price) === 'undefined') {
        errors.price = 'Price is required';
    } else if (!Utils.isInteger(product.price)) {
        errors.price = 'Price must be an integer (whole number) in cents';
    } else if (!Utils.isPositiveInteger(product.price)) {
        errors.price = 'Price must be a positive integer';
    } else if (product.price.toString().length > 15) {
        errors.price = 'Price must be less than 15 characters';
    }

    /**
     * seller
     */
    if (Utils.whatIs(product.seller) === 'undefined') {
        errors.seller = 'Seller is required';
    } else if (!Utils.isString(product.seller)) {
        errors.seller = 'Seller must be a string';
    } else if (product.seller.length > 70) {
        errors.seller = 'Seller cannot be longer than 70 characters';
    } else {
        product.seller = product.seller.toString().replace(/\s{2,}/g, ' ');
    }

    /**
     * audience
     */
    if (Utils.whatIs(product.audience) !== 'undefined') {
        if (!Utils.isArray(product.audience)) {
            errors.audience = 'Audience tags must be an array';
        } else if (product.audience.length > 4) {
            errors.audience = 'Only 4 audience tags are allowed';
        } else if (product.audience.length && product.audience.length <= 4) {
            if (!Utils.isString(product.audience[0]) || !Utils.isString(product.audience[1]) || !Utils.isString(product.audience[2]) || !Utils.isString(product.audience[3])) {
                errors.audience = 'Audience tags must be strings';
            } else if (product.audience[0].length > 30 || product.audience[1].length > 30 || product.audience[2].length > 30 || product.audience[3].length > 30) {
                errors.audience = 'Audience tags cannot be longer than 30 characters';
            } else if (/^[a-zA-Z0-9-]+$/.test(product.audience[0]) === false || /^[a-zA-Z0-9-]+$/.test(product.audience[1]) === false || /^[a-zA-Z0-9-]+$/.test(product.audience[2]) === false || /^[a-zA-Z0-9-]+$/.test(product.audience[3]) === false) {
                errors.audience = 'Audience tags can have only letters, numbers and dashes';
            }
            // Sanitize - Strip out duplicates
            product.audience = Utils.uniq(product.audience);
        }
    }

    /**
     * brand
     */
    if (Utils.whatIs(product.brand) !== 'undefined') {
        if (!Utils.isString(product.brand)) {
            errors.brand = "Brand must be a string";
        } else if (product.brand.length > 40) {
            errors.brand = 'Brand cannot be longer than 40 characters';
        } else {
            // Sanitize
            product.brand = product.brand.toString().replace(/\s{2,}/g, ' ');
        }
    }

    /**
     * category
     */
    if (Utils.whatIs(product.category) !== 'undefined') {
        if (!Utils.isString(product.category)) {
            errors.category = "Category must be a string";
        } else if (product.category.length > 40) {
            errors.category = 'Category cannot be longer than 40 characters';
        } else {
            // Sanitize
            product.category = product.category.toString().replace(/\s{2,}/g, ' ');
        }
    }

    /**
     * subcategory
     */
    if (Utils.whatIs(product.subcategory) !== 'undefined') {
        if (!Utils.isString(product.subcategory)) {
            errors.subcategory = "Subcategory must be a string";
        } else if (product.subcategory.length > 40) {
            errors.subcategory = 'Subcategory cannot be longer than 40 characters';
        } else {
            // Sanitize
            product.subcategory = product.subcategory.toString().replace(/\s{2,}/g, ' ');
        }
    }

    /**
     * condition
     */
    if (Utils.whatIs(product.condition) !== 'undefined') {
        if (ProductArchetypeSchema.properties.condition.enum.indexOf(product.condition) < 0) {
            errors.condition = 'Condition must be one of the allowed strings';
        }
    }

    /**
     * currency
     */
    if (Utils.whatIs(product.currency) !== 'undefined') {
        if (ProductArchetypeSchema.properties.currency.enum.indexOf(product.currency) < 0) {
            errors.currency = 'Currency must be a three-character ISO 4217 currency code';
        }
    }

    /**
     * description
     */
    if (Utils.whatIs(product.description) !== 'undefined') {
        if (!Utils.isString(product.description)) {
            errors.description = "Description must be a string";
        } else if (product.description.length > 4000) {
            errors.description = 'Description cannot be longer than 4000 characters';
        } else {
            // Sanitize
            product.description = product.description.toString().replace(/\s{2,}/g, ' ');
        }
    }

    /**
     *
     * 
     * images
     * 
     *  NOTE:  SERVANT has separate API routes for handling product images and does not use the following code.  However, the code is left here so that Data Archetypes may stand alone.
     *
     * 
     */
    
    if (Utils.whatIs(product.images) !== 'undefined') {
        if (!Utils.isArray(product.images)) {
            errors.images = "Images must be an array";
        } else if (product.images.length > 15) {
            errors.images = "Products cannot have more than 15 images";
        } else if (product.images.length && product.images.length <= 15) {
            var i = 0;
            while (i < product.images.length && !errors.images) {
                if (Utils.whatIs(product.image[i].original) === 'undefined' || Utils.whatIs(product.image[i].large) === 'undefined' || Utils.whatIs(product.image[i].medium) === 'undefined' || Utils.whatIs(product.image[i].small) === 'undefined') {
                    // Check to see if resolutions are present
                    errors.images = 'Missing image resolution.  Images must contain original, large, medium and small resolutions';
                } else if (Utils.whatIs(product.image[i].original) !== 'string' || Utils.whatIs(product.image[i].large) !== 'string' || Utils.whatIs(product.image[i].medium) !== 'string' || Utils.whatIs(product.image[i].small) !== 'string') {
                    // Check to see if resolutions are all strings
                    errors.images = 'Image resolutions must all be strings';
                } else if (Utils.isAbsoluteUri(product.image[i].original) === false || Utils.isAbsoluteUri(product.image[i].large) === false || Utils.isAbsoluteUri(product.image[i].medium) === false || Utils.isAbsoluteUri(product.image[i].small) === false) {
                    errors.images = 'Image resolutions must have valid URLs';
                }
                i++;
            }
        }
    }

    /**
     * in_stock
     */
    if (Utils.whatIs(product.in_stock) !== 'undefined') {
        if (!Utils.isBoolean(product.in_stock)) {
            errors.in_stock = 'In stock status must be a boolean';
        }
    }

    /**
     * model
     */
    if (Utils.whatIs(product.model) !== 'undefined') {
        if (!Utils.isString(product.model)) {
            errors.model = 'Model must be a string';
        } else if (product.model.length > 70) {
            errors.model = 'Model cannot be longer than 70 charactrs';
        } else {
            product.model = product.model.toString().replace(/\s{2,}/g, ' ');
        }
    }

    /**
     * payment_interval
     */
    if (Utils.whatIs(product.payment_interval) !== 'undefined') {
        if (!Utils.isString(product.payment_interval)) {
            errors.payment_interval = 'Payment_interval must be a string';
        } else if (ProductArchetypeSchema.properties.payment_interval.enum.indexOf(product.payment_interval) < 0) {
            errors.payment_interval = 'Payment Interval must be one of the allowed strings';
        } else {
            product.payment_interval = product.payment_interval.toLowerCase();
        }
    } else {
        // Set Default
        product.payment_interval = 'yearly';
    }

    /**
     * recurring_payment
     */
    if (Utils.whatIs(product.recurring_payment) !== 'undefined') {
        if (!Utils.isBoolean(product.recurring_payment)) {
            errors.recurring_payment = 'Recurring payment must be a boolean';
        } else if (Utils.whatIs(product.payment_interval) === 'undefined') {
            errors.recurring_payment = 'You must set payment_interval if you turn on recurring payment';
        }
    }

    /**
     * sale_price
     */
    if (Utils.whatIs(product.sale_price) !== 'undefined') {
        if (!Utils.isInteger(product.sale_price)) {
            errors.sale_price = 'Sale price must be an integer (whole number) in cents';
        } else if (!Utils.isPositiveInteger(product.sale_price)) {
            errors.sale_price = 'Sale price must be a positive integer';
        } else if (product.sale_price.toString().length > 15) {
            errors.sale_price = 'Price must be less than 15 characters';
        }
    } else {
        // Set Default
        product.sale_price = 0;
    }

    /**
     * sale
     */
    if (Utils.whatIs(product.sale) !== 'undefined') {
        if (!Utils.isBoolean(product.sale)) {
            errors.sale = 'Sale must be a boolean';
        } else if (Utils.whatIs(product.sale) === 'undefined') {
            errors.sale = 'You must set payment_interval if you turn on recurring payment';
        }
    } else {
        // Set Default
        product.sale = false;
    }

    /**
     * shipping_prices
     */
    if (Utils.whatIs(product.shipping_prices) !== 'undefined') {
        if (!Utils.isArray(product.shipping_prices)) {
            errors.shipping_prices = 'Shipping prices must be an array of objects';
        } else if (product.shipping_prices.length > 60) {
            errors.shipping_prices = 'Only 60 Shipping Prices are allowed';
        } else if (product.shipping_prices.length && product.shipping_prices.length <= 60) {
            var i = 0;
            while (i < product.shipping_prices.length && !errors.shipping_prices) {
                if (Utils.whatIs(product.shipping_prices[i].place) === 'undefined') {
                    // Check to see if place is present
                    errors.shipping_prices = 'A shipping price is missing a place';
                } else if (!Utils.isString(product.shipping_prices[i].place)) {
                    // Check to see if places are all strings
                    errors.shipping_prices = 'Shipping price places must be strings';
                } else if (ProductArchetypeSchema.properties.shipping_prices.items.properties.place.enum.indexOf(product.shipping_prices[i].place.toLowerCase()) < 0) {
                    // Check to see if place is valid
                    errors.shipping_prices = 'A shipping price has an invalid place';
                } else if (Utils.whatIs(product.shipping_prices[i].price) === 'undefined') {
                    // Check to see if price is present
                    errors.shipping_prices = 'A shipping price is missing a price';
                } else if (!Utils.isInteger(product.shipping_prices[i].price)) {
                    // Check to see if price is integer
                    errors.shipping_prices = 'Shipping prices must be in cents as integers (whole numbers)';
                } else {
                    // Sanitize - Make Place lowercase
                    product.shipping_prices[i].place = product.shipping_prices[i].place.toLowerCase();
                }
                i++;
            }
            // Sanitize - Strip out duplicates
            product.shipping_prices = Utils.uniq(product.shipping_prices);
        }
    }


    /**
     * sku
     */
    if (Utils.whatIs(product.sku) !== 'undefined') {
        if (!Utils.isString(product.sku)) {
            errors.sku = 'SKU must be a string';
        } else if (product.sku.length > 50) {
            errors.sku = 'SKU cannot be longer than 50 charactrs';
        }
    }

    /**
     * tags
     */
    if (Utils.whatIs(product.tags) !== 'undefined') {
        if (!Utils.isArray(product.tags)) {
            errors.tags = 'Tags must be an array';
        } else if (product.tags.length > 6) {
            errors.tags = 'Only 6 tags are allowed';
        } else if (product.tags.length && product.tags.length <= 6) {
            var i = 0;
            while (i < product.tags.length && !errors.tags) {
                if (!Utils.isString(product.tags[i])) {
                    errors.tags = 'Tags must be strings';
                } else {
                    product.tags[i] = product.tags[i].toLowerCase().replace(/\s{2,}/g, ' ');
                }
                i++;
            }
            // Sanitize - Strip out duplicates
            product.tags = Utils.uniq(product.tags);
        }
    }

    /**
     * upc
     */
    if (Utils.whatIs(product.upc) !== 'undefined') {
        if (!Utils.isString(product.upc)) {
            errors.upc = 'UPC must be a string';
        } else if (product.upc.length > 50) {
            errors.upc = 'UPC cannot be longer than 50 charactrs';
        }
    }

    /**
     *
     * 
     *  variations
     * 
     *  NOTE:  SERVANT has separate API routes for handling product variations and does not use the following code.  However, the code is left here so that Data Archetypes may stand alone.
     *
     * 
     */
    if (Utils.whatIs(product.variations) !== 'undefined') {
        if (!Utils.isArray(product.variations)) {
            errors.variations = 'Variations must be an array of objects';
        } else if (product.variations.length > 15) {
            errors.variations = 'Only 15 Variations are allowed';
        } else if (product.variations.length & product.variations.length <= 15) {
            var i = 0;
            while (i < product.variations.length && !errors.variations) {
                if (Utils.whatIs(product.variations[i].variation) === 'undefined') {
                    // Check to see if variations is present
                    errors.variations = 'A variation is missing a variation property';
                } else if (!Utils.isString(product.variations[i].variation)) {
                    // Check to see if places are all strings
                    errors.variations = 'Variations must be strings';
                } else if (Utils.whatIs(product.variations[i].in_stock) === 'undefined') {
                    // Check to see if variation in_stock property is present
                    errors.variations = 'A variation must have an in_stock boolean property';
                } else if (!Utils.isBoolean(product.variations[i].in_stock)) {
                    // Check to see if in_stock is boolean
                    errors.variations = 'in_stock properties must be booleans';
                } else if (Utils.whatIs(product.variations[i].images) !== 'undefined') {
                    // Check to see if variation has images, then validate those
                    if (!Utils.isArray(product.variations[i].images)) {
                        errors.variations = "Variation images must be in an array";
                    } else if (product.variations[i].images.length > 2) {
                        errors.variations = "Variations cannot have more than 2 images";
                    } else {
                        var vi = 0;
                        while (vi < product.variations[i].images.length && !errors.variations) {
                            if (Utils.whatIs(product.variations[i].images.original) === 'undefined' || Utils.whatIs(product.variations[i].images.large) === 'undefined' || Utils.whatIs(product.variations[i].images.medium) === 'undefined' || Utils.whatIs(product.variations[i].images.small) === 'undefined') {
                                // Check to see if resolutions are present
                                errors.variations = 'Variation images are missing image resolutions.  Variation images must contain original, large, medium and small resolutions';
                            } else if (Utils.whatIs(product.variations[i].images.original) !== 'string' || Utils.whatIs(product.variations[i].images.large) !== 'string' || Utils.whatIs(product.variations[i].images.medium) !== 'string' || Utils.whatIs(product.variations[i].images.small) !== 'string') {
                                // Check to see if resolutions are all strings
                                errors.variations = 'Variation image resolutions must all be strings';
                            } else if (Utils.isAbsoluteUri(product.variations[i].images.original) === false || Utils.isAbsoluteUri(product.variations[i].images.large) === false || Utils.isAbsoluteUri(product.variations[i].images.medium) === false || Utils.isAbsoluteUri(product.variations[i].images.small) === false) {
                                // Check to see if resolutions are all valid uris
                                errors.variations = 'Variation image resolutions must have valid URLs';
                            }
                            vi++;
                        }
                    }
                }
                i++;
            }
            // Sanitize - Strip out duplicates
            product.variations = Utils.uniq(product.variations);
        }
    }

    /**
     * Callbacks
     */

    if (Object.keys(errors).length === 0) {
        return callback(null, product);
    } else {
        return callback(errors, null);
    }

}; // validate