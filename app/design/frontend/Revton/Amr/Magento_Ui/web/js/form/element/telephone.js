/**
 * @category  Revton
 * @package   Revton_Amr
 */

/**
 * @api
 */
define([
    'underscore',
    'Magento_Ui/js/form/element/abstract',
    'ko'
], function (_, Abstract, ko) {
    'use strict';

    return Abstract.extend({
        defaults: {
            elementTmpl: 'ui/form/element/telephone',
            countryCode: '+20'
        },

        initialize: function () {
            this._super();

            var self = this;

            // observable for the local part shown in the input
            this.localValue = ko.observable('');

            // initialize localValue from full value if present
            var current = this.value && this.value() ? this.value() : '';
            if (current.indexOf(this.countryCode) === 0) {
                this.localValue(current.substring(this.countryCode.length));
            } else {
                this.localValue(current);
            }

            // when user types local number, update full value with country code
            this.localValue.subscribe(function (newLocal) {
                var full = (self.countryCode || '') + (newLocal || '');
                self.value(full);
            });

            // if full value changes externally, keep localValue in sync
            if (this.value && this.value.subscribe) {
                this.value.subscribe(function (newFull) {
                    newFull = newFull || '';
                    if (self.countryCode && newFull.indexOf(self.countryCode) === 0) {
                        self.localValue(newFull.substring(self.countryCode.length));
                    } else {
                        self.localValue(newFull);
                    }
                });
            }

            return this;
        }
    });
});
