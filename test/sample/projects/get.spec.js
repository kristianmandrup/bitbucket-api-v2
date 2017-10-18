var assert = require('assert');
var sinon = require('sinon');
var BitbucketClient = require('../../index').Client;
var request = require('request-promise');
var Promise = require('bluebird');

describe('Projects', function () {
  var requestGet, bitbucketClient;
  var oauth = require('../mocks/oauth');

  beforeEach(function () {
    bitbucketClient = new BitbucketClient('http://localhost/', oauth);
    requestGet = sinon.stub(request, 'get');
  });

  afterEach(function () {
    requestGet.restore();
  });

  it('should get list of projects', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/projects.json');
    requestGet.returns(Promise.resolve(expected));

    // Test projects.get API.
    bitbucketClient.projects.get()
      .then(function (projects) {
        assert.equal(projects.size, 1);
        assert.deepEqual(projects.values[0], expected.values[0]);
        assert.equal(requestGet.getCall(0).args[0].uri, 'http://localhost/projects?limit=1000');
        assert.equal(requestGet.getCall(0).args[0].oauth, oauth);

        done();
      });
  });
});
