var Utils = {
    isBoolean: function(what) {
        return typeof what === 'boolean';
    },
    isString: function(what) {
        return typeof what === 'string';
    },
    isInteger: function(what) {
        return this.isNumber(what) && what % 1 === 0;
    },
    isPositiveInteger: function(what) {
        return what > -1;
    },
    isNumber: function(what) {
        return typeof what === 'number' && Number.isFinite(what);
    },
    isArray: function(what) {
        return Array.isArray(what);
    },
    isObject: function(what) {
        return typeof what === 'object' && what === Object(what) && !Array.isArray(what);
    },
    isFunction: function(what) {
        return typeof what === 'function';
    },
    whatIs: function(what) {
        if (what === undefined) {
            return 'undefined';
        } else if (what === null) {
            return 'null';
        } else if (this.isBoolean(what)) {
            return 'boolean';
        } else if (this.isString(what)) {
            return 'string';
        } else if (this.isArray(what)) {
            return 'array';
        } else if (this.isInteger(what)) {
            return 'integer';
        } else if (this.isNumber(what)) {
            return 'number';
        } else if (this.isObject(what)) {
            return 'object';
        } else if (this.isFunction(what)) {
            return 'function';
        } else if (Number.isNaN(what)) {
            return 'not-a-number';
        } else {
            throw new Error('Utils.whatIs does not know what this is: ' + what);
        }
    },
    isUniqueArray: function(arr, match) {
        match = match || {};
        var i, j, l = arr.length;
        for (i = 0; i < l; i++) {
            for (j = i + 1; j < l; j++) {
                if (this.areEqual(arr[i], arr[j])) {
                    match.index1 = i;
                    match.index2 = j;
                    return false;
                }
            }
        }
        return true;
    },
    isAbsoluteUri: function(str) {
        return Utils.getRegExp('^https?\:\/\/').test(str);
    },
    forEach: function(obj, callback, context) {
        if (Array.isArray(obj)) {
            return obj.forEach(callback, context);
        } else if (Utils.isObject(obj)) {
            var key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    callback.call(context, obj[key], key);
                }
            }
        }
    },
    map: function(obj, callback, thisArg) {
        var index = -1,
            result = [];

        Utils.forEach(obj, function(val, key) {
            result[++index] = callback.call(thisArg, val, key);
        });

        return result;
    },
    defaults: function(main, def) {
        Utils.forEach(def, function(val, key) {
            if (main[key] === undefined) {
                main[key] = val;
            }
        });
        return main;
    },
    uniq: function(arr) {
        var rv = [];
        arr.forEach(function(val) {
            if (rv.indexOf(val) === -1) {
                rv.push(val);
            }
        });
        return rv;
    },
    difference: function(bigSet, subSet) {
        var rv = [];
        bigSet.forEach(function(val) {
            if (subSet.indexOf(val) === -1) {
                rv.push(val);
            }
        });
        return rv;
    },
    areEqual: function(json1, json2) {
        // http://json-schema.org/latest/json-schema-core.html#rfc.section.3.6

        // Two JSON values are said to be equal if and only if:
        // both are nulls; or
        // both are booleans, and have the same value; or
        // both are strings, and have the same value; or
        // both are numbers, and have the same mathematical value; or
        if (json1 === json2) {
            return true;
        }

        var i, len;

        // both are arrays, and:
        if (this.isArray(json1) && this.isArray(json2)) {
            // have the same number of items; and
            if (json1.length !== json2.length) {
                return false;
            }
            // items at the same index are equal according to this definition; or
            len = json1.length;
            for (i = 0; i < len; i++) {
                if (!this.areEqual(json1[i], json2[i])) {
                    return false;
                }
            }
            return true;
        }

        // both are objects, and:
        if (this.isObject(json1) && this.isObject(json2)) {
            // have the same set of property names; and
            var keys1 = Object.keys(json1);
            var keys2 = Object.keys(json2);
            if (!this.areEqual(keys1, keys2)) {
                return false;
            }
            // values for a same property name are equal according to this definition.
            len = keys1.length;
            for (i = 0; i < len; i++) {
                if (!this.areEqual(json1[keys1[i]], json2[keys1[i]])) {
                    return false;
                }
            }
            return true;
        }

        return false;
    },
    decodeJSONPointer: function(str) {
        // http://tools.ietf.org/html/draft-ietf-appsawg-json-pointer-07#section-3
        return decodeURIComponent(str).replace(/~[0-1]/g, function(x) {
            return x === '~1' ? '/' : '~';
        });
    },
    _getRegExpCache: {},
    getRegExp: function(pattern) {
        if (!this._getRegExpCache[pattern]) {
            this._getRegExpCache[pattern] = RegExp(pattern);
        }
        return this._getRegExpCache[pattern];
    },
    resolveSchemaId: function(schema, id) {
        if (!this.isObject(schema) && !this.isArray(schema)) {
            return;
        }
        if (schema.id === id) {
            return schema;
        }
        var rv = null;
        Utils.forEach(schema, function(val, key) {
            // prevent recursing through z-schema properties
            if (typeof key === 'string' && key.indexOf('__$') === 0) {
                return;
            }

            if (!rv) {
                rv = Utils.resolveSchemaId(val, id);
            }
        });
        return rv;
    }
};

module.exports = Utils;