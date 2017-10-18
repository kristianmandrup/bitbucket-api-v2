var assert = require('assert');
var sinon = require('sinon');
var BitbucketClient = require('../../index').Client;
var request = require('request-promise');
var Promise = require('bluebird');

describe('Settings', function () {
  var requestGet, bitbucketClient;
  var auth = require('../mocks/auth');

  beforeEach(function () {
    bitbucketClient = new BitbucketClient('http://localhost/', auth);
    requestGet = sinon.stub(request, 'get');
  });

  afterEach(function () {
    requestGet.restore();
  });

  it('should get user\'s settings', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/settings');
    requestGet.returns(Promise.resolve(expected));

    // Test prs.get API.
    bitbucketClient.settings.get('username')
      .then(function (settings) {
        assert.deepEqual(settings, expected);

        assert.equal(
          requestGet.getCall(0).args[0].uri,
          'http://localhost/users/username/settings'
        );

        assert.equal(
          requestGet.getCall(0).args[0].auth,
          auth
        );

        done();
      });
  });
});
