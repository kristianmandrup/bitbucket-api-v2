const _ = require('lodash');
const {
  createPromisedApi
} = require('./promised')

const AbstractApi = require('./abstract_api');

/**
 * API docs: https://confluence.atlassian.com/bitbucket/teams-endpoint-423626335.html
 */
module.exports = function TeamsApi(api, opts = {}) {
  const result = AbstractApi(api, opts = {});

  let localApi = {
    name: 'Teams',
    /**
     * Get the teams for the authenticated user
     */
    get(role = 'member', callback) {
      api.get(
        'teams', {
          role
        },
        null,
        result.$createListener(callback)
      );
    }
  };

  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
};
