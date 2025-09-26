/**
 * @vendor      Revton
 * @theme       Revton_Amr
 * @author      Amr Osama <amrosama5@gmail.com>
 */

/**
 * @api
 */
define([
    'jquery',
    'uiComponent',
    'Magento_Customer/js/customer-data',
    'underscore',
    'escaper',
    'Magento_Ui/js/modal/modal',
    'jquery/jquery-storageapi'
], function ($, Component, customerData, _, escaper, modal) {
    'use strict';

    return Component.extend({
        defaults: {
            cookieMessages: [],
            cookieMessagesObservable: [],
            messages: [],
            allowedTags: ['div', 'span', 'b', 'strong', 'i', 'em', 'u', 'a']
        },

        /**
         * Extends Component object by storage observable messages.
         */
        initialize: function () {
            this._super().observe(
                [
                    'cookieMessagesObservable'
                ]
            );

            // The "cookieMessages" variable is not used anymore. It exists for backward compatibility; to support
            // merchants who have overwritten "messages.phtml" which would still point to cookieMessages instead of the
            // observable variant (also see https://github.com/magento/magento2/pull/37309).
            this.cookieMessages = _.unique($.cookieStorage.get('mage-messages'), 'text');
            this.cookieMessagesObservable(this.cookieMessages);

            this.messages = customerData.get('messages').extend({
                disposableCustomerData: 'messages'
            });

            $.mage.cookies.set('mage-messages', '', {
                samesite: 'strict',
                domain: ''
            });

            this.initModal();
            this.autoOpenIfHasMessages();

            // Re-open modal when new messages arrive via customerData
            var self = this;
            this.messages.subscribe(function (data) {
                if (data && data.messages && data.messages.length) {
                    self.autoOpenIfHasMessages();
                }
            });

            // Re-open modal when cookie-based messages change
            this.cookieMessagesObservable.subscribe(function (val) {
                if (val && val.length) {
                    self.autoOpenIfHasMessages();
                }
            });
        },

        /**
         * Prepare the given message to be rendered as HTML
         *
         * @param {String} message
         * @return {String}
         */
        prepareMessageForHtml: function (message) {
            return escaper.escapeHtml(message, this.allowedTags);
        },
        /**
         * Initialize Magento UI modal on messages container
         */
        initModal: function () {
            var self = this;
            var $modalEl = $('#messages-modal');

            if (!$modalEl.length) {
                return;
            }

            if ($modalEl.data('mageModal')) {
                return;
            }

            modal({
                type: 'popup',
                modalClass: 'messages-modal-popup',
                title: $.mage.__('Notifications'),
                buttons: [{
                    text: $.mage.__('Close'),
                    class: 'action-close',
                    click: function () {
                        this.closeModal();
                        self.purgeMessages();
                    }
                }],
                closed: function () {
                    self.purgeMessages();
                }
            }, $modalEl);
        },
        /**
         * Open modal if there are messages to show
         */
        autoOpenIfHasMessages: function () {
            var $modalEl = $('#messages-modal');
            if (!$modalEl.length) {
                return;
            }

            var hasCookieMessages = this.cookieMessagesObservable() && this.cookieMessagesObservable().length > 0;
            var currentMessages = this.messages();
            var hasMessages = hasCookieMessages || (currentMessages && currentMessages.messages && currentMessages.messages.length > 0);

            if (hasMessages) {
                $modalEl.modal('openModal');
            }
        },
        purgeMessages: function () {
            if (!_.isEmpty(this.messages().messages)) {
                customerData.set('messages', {});
            }
        }
    });
});
