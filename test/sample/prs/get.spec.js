var assert = require('assert');
var sinon = require('sinon');
var BitbucketClient = require('../../index').Client;
var request = require('request-promise');
var Promise = require('bluebird');

describe('Pull Requests', function () {
  var requestGet, bitbucketClient;
  var auth = require('../mocks/auth');
  var oauth = require('../mocks/oauth');

  beforeEach(function () {
    bitbucketClient = new BitbucketClient('http://localhost/', oauth);
    requestGet = sinon.stub(request, 'get');
  });

  afterEach(function () {
    requestGet.restore();
  });

  it('should get list of pull requests for a project/repo', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/prs.json');

    requestGet.onCall(0).returns(Promise.resolve(expected));
    requestGet.onCall(1).returns(Promise.resolve(expected));

    // Test prs.get API.
    bitbucketClient.prs.get('PRJ', 'my-repo')
      .then(function (prs) {
        assert.equal(prs.size, 1);
        assert.deepEqual(prs.values[0], expected.values[0]);

        assert.equal(
          requestGet.getCall(0).args[0].uri,
          'http://localhost/projects/PRJ/repos/my-repo/pull-requests?limit=1000&state=OPEN'
        );

        assert.equal(
          requestGet.getCall(0).args[0].oauth,
          oauth
        );

        // Test getCombined proxies to normal get for project/repo.
        return bitbucketClient.prs.getCombined('PRJ', 'my-repo')
      })
      .then(function (prs) {
        assert.equal(prs.size, 1);
        assert.deepEqual(prs.values[0], expected.values[0]);
        assert.equal(
          requestGet.getCall(1).args[0].uri,
          'http://localhost/projects/PRJ/repos/my-repo/pull-requests?limit=1000&state=OPEN'
        );
        done();
      });
  });

  it('should get a combined list of pull requests for all repos', function (done) {
    // Mock the HTTP Client get.
    var expectedProjects = require('../mocks/projects.json');
    var expectedRepos = require('../mocks/repos.json');
    var expectedPrs = require('../mocks/prs.json');

    requestGet.onCall(0).returns(Promise.resolve(expectedProjects));
    requestGet.onCall(1).returns(Promise.resolve(expectedRepos));
    requestGet.onCall(2).returns(Promise.resolve(expectedPrs));

    // Test prs.get API.
    bitbucketClient.prs.getCombined()
      .then(function (prs) {
        assert.deepEqual(prs.values[0], expectedPrs.values[0]);
        assert.equal(
          requestGet.getCall(0).args[0].uri,
          'http://localhost/projects?limit=1000'
        );
        assert.equal(
          requestGet.getCall(1).args[0].uri,
          'http://localhost/projects/PRJ/repos?limit=1000'
        );
        assert.equal(
          requestGet.getCall(2).args[0].uri,
          'http://localhost/projects/PRJ/repos/my-repo/pull-requests?limit=1000&state=OPEN'
        );
        done();
      });
  });

  it('should filter PRs by author', function (done) {
    // Mock the HTTP Client get.
    var expectedProjects = require('../mocks/projects.json');
    var expectedRepos = require('../mocks/repos.json');
    var expectedPrs = require('../mocks/prs.json');

    requestGet.onCall(0).returns(Promise.resolve(expectedProjects));
    requestGet.onCall(1).returns(Promise.resolve(expectedRepos));
    requestGet.onCall(2).returns(Promise.resolve(expectedPrs));

    // Test prs.get API.
    bitbucketClient.prs.getCombined(null, null, {
        author: 'tom'
      })
      .then(function (prs) {
        assert.deepEqual(prs.values[0], expectedPrs.values[0]);
      })
      .then(function () {
        requestGet.onCall(3).returns(Promise.resolve(expectedProjects));
        requestGet.onCall(4).returns(Promise.resolve(expectedRepos));
        requestGet.onCall(5).returns(Promise.resolve(expectedPrs));

        // Test prs.get API.
        return bitbucketClient.prs.getCombined(null, null, {
          author: 'ben'
        });
      })
      .then(function (prs) {
        assert.equal(prs.values.length, 0);
        done();
      });
  });

  it('should gracefully handle errors', function (done) {
    // Mock the HTTP Client get.
    var expectedProjects = require('../mocks/projects.json');
    var expectedRepos = require('../mocks/repos.json');

    requestGet.onCall(0).returns(Promise.resolve(expectedProjects));
    requestGet.onCall(1).returns(Promise.resolve(expectedRepos));
    requestGet.onCall(2).throws();

    // Test prs.get API.
    bitbucketClient.prs.getCombined()
      .then(function () {
        assert.fail();
      })
      .catch(function (e) {
        assert.equal(e.message, 'Error');

        requestGet.onCall(3).returns(Promise.resolve(expectedProjects));
        requestGet.onCall(4).throws();

        return bitbucketClient.prs.getCombined();
      })
      .then(function () {
        assert.fail();
      })
      .catch(function (e) {
        assert.equal(e.message, 'Error');
        requestGet.onCall(5).throws();

        return bitbucketClient.prs.getCombined();
      })
      .then(function () {
        assert.fail();
      })
      .catch(function (e) {
        assert.equal(e.message, 'Error');
        done();
      });
  });
});
