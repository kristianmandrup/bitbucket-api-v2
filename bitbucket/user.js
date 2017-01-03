const _ = require('lodash');

const AbstractApi = require('./abstract_api');

/**
 * API docs: https://confluence.atlassian.com/bitbucket/user-endpoint-2-0-744527199.html
 */
module.exports = function UserApi(api) {
  const result = AbstractApi(api);

  return _.assign(result, {
    /**
     * Get the info for the authenticated user
     */
    get(callback) {
      api.get(
        'user',
        null, null,
        result.$createListener(callback)
      );
    }
  });
};
