var assert = require('assert');
var sinon = require('sinon');
var BitbucketClient = require('../../index').Client;
var request = require('request-promise');
var Promise = require('bluebird');

describe('Hooks', function () {
  var requestGet, bitbucketClient;
  var oauth = require('../mocks/oauth');

  beforeEach(function () {
    bitbucketClient = new BitbucketClient('http://localhost', oauth);
    requestGet = sinon.stub(request, 'get');
  });

  afterEach(function () {
    requestGet.restore();
  });

  it('should get list of hooks', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/hooks.json');
    requestGet.returns(Promise.resolve(expected));

    // Test hooks.get API.
    bitbucketClient.hooks.get('PRJ', 'my-repo')
      .then(function (hooks) {
        assert.equal(hooks.size, 1);
        assert.deepEqual(hooks.values[0], expected.values[0]);
        assert.equal(
          requestGet.getCall(0).args[0].uri,
          'http://localhost/projects/PRJ/repos/my-repo/settings/hooks?limit=1000'
        );

        done();
      });
  });

  it('should get a single hook', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/hook-single.json');
    requestGet.returns(Promise.resolve(expected));

    // Test hooks.get API.
    var hookKey = 'com.atlassian.stash.plugin.example:example-repository-hook';
    bitbucketClient.hooks.getHook('PRJ', 'my-repo', hookKey)
      .then(function (hook) {
        assert.deepEqual(hook.details, expected.details);
        assert.equal(
          requestGet.getCall(0).args[0].uri,
          'http://localhost/projects/PRJ/repos/my-repo/settings/hooks/' + hookKey
        );

        done();
      });
  });

  it('should just get the PRE_RECEIVE hooks', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/hooks.json');
    requestGet.returns(Promise.resolve(expected));

    // Test hooks.get API.
    bitbucketClient.hooks.getPreReceive('PRJ', 'my-repo')
      .then(function (hooks) {
        assert.equal(hooks.size, 1);
        assert.deepEqual(hooks.values[0], expected.values[0]);

        done();
      });
  });

  it('should just get the POST_RECEIVE hooks', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/hooks.json');
    requestGet.returns(Promise.resolve(expected));

    // Test hooks.get API.
    bitbucketClient.hooks.getPostReceive('PRJ', 'my-repo')
      .then(function (hooks) {
        assert.equal(hooks.size, 1);
        assert.deepEqual(hooks.values[0], expected.values[0]);

        done();
      });
  });
});
