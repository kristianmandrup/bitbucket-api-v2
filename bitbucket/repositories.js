const AbstractApi = require('./abstract_api');

class RepositoriesApi extends AbstractApi {
  constructor(api) {
    super(api);
  }

  /**
   * Get the repositories of a user
   * https://confluence.atlassian.com/bitbucket/repositories-endpoint-423626330.html#repositoriesEndpoint-GETalistofrepositoriesforanaccount
   *
   * @param {String}  username         the username
   */
  getByUser(username, callback) {
    this.$api.get(
        'repositories/' + encodeURI(username),
        null, null,
        this.$createListener(callback)
    );
  }
}

module.exports = RepositoriesApi;
