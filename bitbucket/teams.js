const AbstractApi = require('./abstract_api');

/**
 * API docs: https://confluence.atlassian.com/bitbucket/teams-endpoint-423626335.html
 */
class TeamsApi extends AbstractApi {
  constructor(api) {
    super(api);
  }

  /**
   * Get the teams for the authenticated user
   */
  get(role = 'member', callback) {
    this.$api.get(
      `teams`,
      { role },
      null,
      this.$createListener(callback)
    );
  }
}

module.exports = TeamsApi;
