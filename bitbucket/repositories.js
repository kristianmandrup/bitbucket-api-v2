const _ = require('lodash');

const AbstractApi = require('./abstract_api');

/**
 * API docs: https://confluence.atlassian.com/bitbucket/repositories-endpoint-423626330.html
 *           https://confluence.atlassian.com/bitbucket/repository-resource-423626331.html
 */
class RepositoriesApi extends AbstractApi {
  constructor(api) {
    super(api);
  }

  /**
   * Create a new repository
   * @param {String} repo owner
   * @param {String} name of the repo. This is not a slug (may include special characters)
   * @param {Object} repo repo metadata as specified by Bitbucket's API documentation.
   *                           NOTE Unlike the normal API, Including an explicit name property in repo is REQUIRED!!
   *                           Due to limitations in the API, the slug is derived from the repo name within this method.
   */
  create(username, repo, callback) {
    if (!repo || !_.isBoolean(repo.is_private) || !_.isString(repo.name)) {
      throw new Error('Repo must be initialized with a booelan privacy setting and a string name');
    }

    // The official API error is that slugs must be alphanumeric with underscore, dot, and dash, lowercase, and
    // no whitespace. Most things convert to dashes with Atlassian's secret converter but apostophes just disappear
    // (here I've assumed quotes are the same).
    // There are additional constraints not provided in the error message nor documented anywhere that can only be
    // found by trial and error. Among these are: no consecutive dashes except in some weird trivial edge classnames
    // (i.e. all dashes, which we won't worry about), no ending in a dash, and very likely no starting in a dash.
    const repoSlug = repo.name.replace(/['"]/g, '').replace(/\W/g, '-')
      .replace(/--+/g, '-').replace(/^-/, '').replace(/-$/, '').toLowerCase();

    this.$api.post(
      'repositories/' + encodeURI(username) + '/' + encodeURI(repoSlug),
      repo, null,
      this.$createListener(callback)
    );
  }

  /**
   * Create a new pull request
   *
   * @param {String} repo owner
   * @param {String} slug (name) of the repo.
   * @param {Object} pullRequest The PR POST body as specified by Bitbucket's API documentation
   */
  createPullRequest(username, repoSlug, pullRequest, callback) {
    this.$api.post(
      // This may be the only API call in the entire Bitbucket specs that has a / at the end.
      // It probably doesn't matter, but the docs will be strictly followed just in case.
      'repositories/' + encodeURI(username) + '/' + encodeURI(repoSlug) + '/pullrequests/',
      pullRequest, null,
      this.$createListener(callback)
    );
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
   * Get the branch info for a single repo
   *
   * @param {String} repo owner
   * @param {String} slug (name) of the repo.
   */
  getBranches(username, repoSlug, callback) {
    this.$api.get(
      'repositories/' + encodeURI(username) + '/' + encodeURI(repoSlug) + '/refs/branches',
      null, null,
      this.$createListener(callback)
    );
  }

  /**
   * Get a single commit
   * @param {String} repo owner
   * @param {String} slug (name) of the repo.
   * @param {String} the sha of the commit
   */
  getCommit(username, repoSlug, sha, callback) {
    this.$api.get(
      'repositories/' + encodeURI(username) + '/' + encodeURI(repoSlug) + '/commit/' + sha,
      null, null,
      this.$createListener(callback)
    );
  }

  /**
   * Get the pull requests for a single repo
   *
   * @param {String} repo owner
   * @param {String} slug (name) of the repo.
   * @param {$api.constants.pullRequest.states or Array thereof} The PR state. If invalid or undefined, defaults to OPEN
   */
  getPullRequests(username, repoSlug, state, callback) {
    const { constants } = this.$api;
    let stateArray = state;
    if (!stateArray) {
      stateArray = [constants.pullRequest.states.OPEN];
    }
    else if (!_.isArray(stateArray)) {
      stateArray = [stateArray];
    }

    const hasInvalidState = _.find(state, (stateElement) => !_.includes(constants.pullRequest.states, stateElement));
    if (hasInvalidState) {
      stateArray = [constants.pullRequest.states.OPEN];
    }

    const apiParameters = {
      state: stateArray.join(',')
    };

    this.$api.get(
      'repositories/' + encodeURI(username) + '/' + encodeURI(repoSlug) + '/pullrequests',
      apiParameters, null,
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
    const prebuiltURL = _.get(response, 'parent.links.self.href');

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
