const AbstractApi = require('./abstract_api');

/**
 * API docs: https://confluence.atlassian.com/bitbucket/user-endpoint-2-0-744527199.html
 */
class UserApi extends AbstractApi {
  constructor(api) {
    super(api);
  }

  /**
   * Get the info for the authenticated user
   */
  get(callback) {
    this.$api.get(
      'user',
      null, null,
      this.$createListener(callback)
    );
  }
}

module.exports = UserApi;
