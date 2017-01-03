const _ = require('lodash');

const AbstractApi = require('./abstract_api');

/**
 * API docs: https://confluence.atlassian.com/bitbucket/teams-endpoint-423626335.html
 */
module.exports = function TeamsApi(api) {
  const result = AbstractApi(api);

  return _.assign(result, {
    /**
     * Get the teams for the authenticated user
     */
    get(role = 'member', callback) {
      api.get(
        'teams',
        { role },
        null,
        result.$createListener(callback)
      );
    }
  });
};
