var AbstractApi = exports.AbstractApi = function(api) {
    this.$api = api;
    this.$nextPageURLs = {};
    this.$previousPageURLs = {};
};

(function() {

    this.$createListener = function(callback, methodName) {
        return function(err, response) {
            if (err) {
                if (callback) {
                  callback(err);
                }
                return;
            }

            this.$nextPageURLs[methodName] = response.next;
            this.$previousPageURLs[methodName] = response.previous;

            if (callback) {
              callback(err, response);
            }
        };
    };

}).call(AbstractApi.prototype);
