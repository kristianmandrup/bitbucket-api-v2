const AbstractApi = require('./abstract_api');

/**
 * API docs: https://confluence.atlassian.com/bitbucket/repositories-endpoint-423626330.html
 */
class RepositoriesApi extends AbstractApi {
  constructor(api) {
    super(api);
  }

  /**
   * Get the info for a single repo
   *
   * @param {String} repo owner
   * @param {String} slug (name) of the repo.
   */
  get(username, repoSlug, callback) {
    this.$api.get(
      'repositories/' + encodeURI(username) + '/' + encodeURI(repoSlug),
      null, null,
      this.$createListener(callback)
    );
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

  /**
   * Get the forks for a repo
   *
   * @param {String} repo owner
   * @param {String} slug (name) of the repo.
   */
  getForks(username, repoSlug, callback) {
    this.$api.get(
      'repositories/' + encodeURI(username) + '/' + encodeURI(repoSlug) + '/forks',
      null, null,
      this.$createListener(callback)
    );
  }

  /**
   * Get the forks for a repo using an API response that has repository links
   *
   * @param {Object} API response
   */
  getForksFromResponse(response, callback) {
    const prebuiltURL = response && response.links && response.links.forks && response.links.forks.href;

    if (!prebuiltURL) {
      throw new Error('getForksFromResponse: argument has no \'forks\' url.');
    }

    this.$api.request.doPrebuiltSend(
      prebuiltURL,
      this.$createListener(callback)
    );
  }

  /**
   * Get the parent for a repo using an API response that has repository links.
   * This should only be called after a check to hasParent().
   *
   * @param {Object} API response
   */
  getParentFromResponse(response, callback) {
    const prebuiltURL = response && response.parent && response.parent.links && response.parent.links.self && response.parent.links.self.href;

    if (!prebuiltURL) {
      throw new Error('getForksFromResponse: argument has no \'parent\' info. Call hasParent first to guard this method call.');
    }

    this.$api.request.doPrebuiltSend(
      prebuiltURL,
      this.$createListener(callback)
    );
  }

  /**
   * Determines whether or not the given response has an accessible parent.
   *
   * @param {Object} API response
   * @return {boolean} true if the argument has an associated "parent" (i.e. the response is a fork), false otherwise.
   */
  hasParent(response) {
    return !!response.parent;
  }
}

module.exports = RepositoriesApi;
