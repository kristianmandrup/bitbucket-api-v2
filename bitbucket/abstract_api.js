var AbstractApi = exports.AbstractApi = function(api) {
    this.$api = api;
};

(function() {

    this.$createListener = function(callback, key) {
        return function(err, response) {
            if (err) {
                callback && callback(err);
                return;
            }

            callback && callback(err, key ? response[key] : response);
        };
    };

}).call(AbstractApi.prototype);
