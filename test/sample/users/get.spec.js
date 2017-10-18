var assert = require('assert');
var sinon = require('sinon');
var BitbucketClient = require('../../index').Client;
var request = require('request-promise');
var Promise = require('bluebird');

describe('Users', function () {
  var requestGet, bitbucketClient;
  var auth = require('../mocks/auth');

  beforeEach(function () {
    bitbucketClient = new BitbucketClient('http://localhost/', auth);
    requestGet = sinon.stub(request, 'get');
  });

  afterEach(function () {
    request.get.restore();
  });

  it('should get list of users', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/users.json');

    requestGet.returns(Promise.resolve(expected));

    // Test users.get API.
    bitbucketClient.users.get()
      .then(function (users) {
        assert.equal(users.size, 1);
        assert.deepEqual(users.values[0], expected.values[0]);
        assert.equal(requestGet.getCall(0).args[0].uri, 'http://localhost/users?limit=1000');

        done();
      });
  });

  it('should get a single user', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/user-single.json');
    requestGet.returns(Promise.resolve(expected));

    bitbucketClient.users.getUser('user-slug')
      .then(function (user) {
        assert.deepEqual(user, expected);
        assert.equal(requestGet.getCall(0).args[0].uri, 'http://localhost/users/user-slug');

        done();
      });
  });

});
