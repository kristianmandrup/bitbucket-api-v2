let util = require('util');
let AbstractApi = require('./abstract_api').AbstractApi;

/**
 * API wrapper for http://confluence.atlassian.com/display/BBDEV/Emails
 */
let EmailApi = exports.EmailApi = function(api) {
    this.$api = api;
};

util.inherits(EmailApi, AbstractApi);

(function() {

    /**
     * Get auuser data including the repository list
     */
    this.getAll = function(callback) {
        this.$api.get('emails/', null, null, callback);
    };

}).call(EmailApi.prototype);
