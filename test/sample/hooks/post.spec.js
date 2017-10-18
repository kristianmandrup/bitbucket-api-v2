var assert = require('assert');
var sinon = require('sinon');
var BitbucketClient = require('../../index').Client;
var request = require('request-promise');
var Promise = require('bluebird');

describe('Hooks', function () {
  var requestPost, bitbucketClient;
  var oauth = require('../mocks/oauth');

  beforeEach(function () {
    bitbucketClient = new BitbucketClient('http://localhost', oauth);
    requestPost = sinon.stub(request, 'post');
  });

  afterEach(function () {
    requestPost.restore();
  });

  it('should enable hooks', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/hooks.json');
    requestPost.returns(Promise.resolve(expected));

    var hookDetails = {
      hook: 'hook',
      details: 'details'
    };

    // Test hooks.get API.
    bitbucketClient.hooks.enable('projectKey', 'repoSlug', 'hookKey', hookDetails)
      .then(function (hooks) {
        assert.equal(
          requestPost.getCall(0).args[0].uri,
          'http://localhost/projects/projectKey/repos/repoSlug/settings/hooks/hookKey/enabled'
        );
        assert.equal(requestPost.getCall(0).args[0].body, hookDetails);

        done();
      });
  });
});
