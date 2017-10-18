var assert = require('assert');
var sinon = require('sinon');
var BitbucketClient = require('../../index').Client;
var request = require('request-promise');
var Promise = require('bluebird');

describe('Branches', function () {
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

  it.skip('should get list of branches by project for a repo', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/branches.json');
    requestGet.returns(Promise.resolve(expected));

    // Test repos.get API.
    bitbucketClient.branches.get('PRJ', 'my-repo')
      .then(function (branches) {
        assert.equal(branches.size, 5);
        assert.deepEqual(branches.values[0], expected.values[0]);
        assert.equal(requestGet.getCall(0).args[0].uri, 'http://localhost/projects/PRJ/repos/my-repo/branches?limit=1000');

        done();
      });
  });
});
