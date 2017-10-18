var assert = require('assert');
var sinon = require('sinon');
var BitbucketClient = require('../../index').Client;
var request = require('request-promise');
var Promise = require('bluebird');

describe('Tags', function () {
  var requestGet, bitbucketClient;
  var oauth = require('../mocks/oauth');

  beforeEach(function () {
    bitbucketClient = new BitbucketClient('http://localhost/', oauth);
    requestGet = sinon.stub(request, 'get');
  });

  afterEach(function () {
    request.get.restore();
  });

  it('should get list of tags by project for a repo', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/tags.json');
    requestGet.returns(Promise.resolve(expected));

    // Test repos.get API.
    bitbucketClient.tags.get('PRJ', 'my-repo')
      .then(function (tags) {
        assert.equal(tags.size, 5);
        assert.deepEqual(tags.values[0], expected.values[0]);
        assert.equal(requestGet.getCall(0).args[0].uri, 'http://localhost/projects/PRJ/repos/my-repo/tags?limit=1000');

        done();
      });
  });
});
