const AbstractApi = require('./abstract_api');

/**
 * API docs: https://confluence.atlassian.com/bitbucket/repositories-endpoint-423626330.html
 */
class RepositoriesApi extends AbstractApi {
  constructor(api) {
    super(api);
  }

  /**
   * Get the repositories of a user
   *
   * @param {String}  username
   */
  getByUser(username, callback) {
    this.$api.get(
        'repositories/' + encodeURI(username),
        null, null,
        this.$createListener(callback)
    );
  }

  /**
   * Get the repositories of a team
   *
   * @param {String}  teamname
   */
  getByTeam(teamname, callback) {
    this.$api.get(
        'repositories/' + encodeURI(teamname),
        null, null,
        this.$createListener(callback)
    );
  }
}

module.exports = RepositoriesApi;
