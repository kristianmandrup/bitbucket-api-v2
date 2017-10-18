var assert = require('assert');
var sinon = require('sinon');
var BitbucketClient = require('../../index').Client;
var request = require('request-promise');
var Promise = require('bluebird');

describe('Repos', function () {
  var requestGet, bitbucketClient;
  var oauth = require('../mocks/oauth');

  beforeEach(function () {
    bitbucketClient = new BitbucketClient('http://localhost/', oauth, {
      logging: true
    });
    requestGet = sinon.stub(request, 'get');
  });

  afterEach(function () {
    request.get.restore();
  });

  it('should get list of repos for a project', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/repos.json');

    requestGet.onCall(0)
      .returns(Promise.resolve(expected));
    requestGet.onCall(1)
      .returns(Promise.resolve(expected));

    // Test repos.get API.
    bitbucketClient.repos.get('PRJ')
      .then(function (repos) {
        assert.equal(repos.size, 1);
        assert.deepEqual(repos.values[0], expected.values[0]);
        assert.equal(requestGet.getCall(0).args[0].uri, 'http://localhost/projects/PRJ/repos?limit=1000');

        // Test that getCombined proxies to normal get, when project key given.
        return bitbucketClient.repos.getCombined('PRJ');
      })
      .then(function (repos) {
        assert.equal(repos.size, 1);
        assert.deepEqual(repos.values[0], expected.values[0]);
        assert.equal(requestGet.getCall(1).args[0].uri, 'http://localhost/projects/PRJ/repos?limit=1000');

        done();
      });
  });

  it('should get a combined list of repos for all projects', function (done) {
    // Mock the HTTP Client get.
    var expectedProjects = require('../mocks/projects.json');
    var expectedRepos = require('../mocks/repos.json');

    requestGet.onCall(0)
      .returns(Promise.resolve(expectedProjects));
    requestGet.onCall(1)
      .returns(Promise.resolve(expectedRepos));

    // Test repos.get API.
    bitbucketClient.repos.getCombined()
      .then(function (repos) {
        assert.deepEqual(repos.values[0], expectedRepos.values[0]);
        assert.equal(requestGet.getCall(0).args[0].uri, 'http://localhost/projects?limit=1000');
        assert.equal(requestGet.getCall(1).args[0].uri, 'http://localhost/projects/PRJ/repos?limit=1000');

        done();
      });
  });

  it('should fail gracefully when getting repos', function (done) {
    // Mock the HTTP Client get.
    var expectedProjects = require('../mocks/projects.json');

    requestGet.onCall(0)
      .returns(Promise.resolve(expectedProjects));
    requestGet.onCall(1).throws();

    // Test error.
    bitbucketClient.repos.getCombined()
      .then(function () {
        assert.fail();
      })
      .catch(function (e) {
        assert.equal(e.message, 'Error');

        // Test error on 2nd call.
        requestGet.onCall(2).throws();
        requestGet.onCall(3)
          .returns(expectedProjects);

        // Test error.
        bitbucketClient.repos.getCombined()
          .then(function () {
            assert.fail();
          })
          .catch(function (e) {
            assert.equal(e.message, 'Error');
            done();
          });
      });
  });

  it('should get a single project', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/repo-single.json');
    requestGet.returns(Promise.resolve(expected));

    bitbucketClient.repos.getRepo('PRJ', 'my-repo')
      .then(function (repos) {
        assert.deepEqual(repos, expected);
        assert.equal(requestGet.getCall(0).args[0].uri, 'http://localhost/projects/PRJ/repos/my-repo');

        done();
      });
  });

  it('should browse a repo', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/repo-browse.json');

    requestGet.returns(Promise.resolve(expected));

    bitbucketClient.repos.browse('PRJ', 'my-repo')
      .then(function (browse) {
        assert.deepEqual(browse, expected);
        assert.equal(requestGet.getCall(0).args[0].uri, 'http://localhost/projects/PRJ/repos/my-repo/browse?limit=1000');

        return bitbucketClient.repos.browse('PRJ', 'my-repo', {
          path: '/my-path/foo.html'
        });
      })
      .then(function (browse) {
        var toCall = 'http://localhost/projects/PRJ/repos/my-repo/browse/my-path/foo.html?limit=1000';
        assert.equal(requestGet.getCall(1).args[0].uri, toCall);

        // test that it will add the first slash in path if missing
        return bitbucketClient.repos.browse('PRJ', 'my-repo', {
          path: 'my-path/foo.html'
        });
      })
      .then(function (browse) {
        var toCall = 'http://localhost/projects/PRJ/repos/my-repo/browse/my-path/foo.html?limit=1000';
        assert.equal(requestGet.getCall(2).args[0].uri, toCall);

        done();
      });
  });
});
