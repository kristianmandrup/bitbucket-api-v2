var assert = require('chai').assert;
var sinon = require('sinon');
var BitbucketClient = require('../index').Client;
var request = require('request-promise');
var Promise = require('bluebird');
var _ = require('lodash');

describe('Client', function () {
  var baseUrl = 'http://localhost/';
  var auth = require('./mocks/auth');
  var oauth = require('./mocks/oauth');
  var repos = require('./mocks/repos');

  it('should complain about missing baseUrl parameter', function (done) {
    assert.throws(function () {
      new BitbucketClient(null, oauth);
    }, 'Base URL is missing');

    done();
  });

  it('should add missing slash at end only if it\'s missing', function (done) {
    var client = new BitbucketClient('http://localhost', auth);
    assert.equal(client.baseUrl, 'http://localhost/');

    client = new BitbucketClient('http://localhost/', auth);
    assert.equal(client.baseUrl, 'http://localhost/');

    done();
  });

  it('should ignore all other auth fields if auth.type === public', function (done) {
    var client = new BitbucketClient('http://localhost', {
      type: 'public',
      username: 'username',
      password: 'password'
    });

    assert.equal(client.auth, undefined);
    assert.equal(client.oauth, undefined);

    done();
  });

  it('should complain about missing username/password attributes if auth.type === basic', function (done) {
    var auth = {
      type: 'basic'
    };

    assert.throws(function () {
      new BitbucketClient(baseUrl, auth);
    }, 'Auth\'s username and/or password is missing');

    done();
  });

  it('should default to auth.type=public if none provided, this no auth or oauth object', function (done) {
    var client = new BitbucketClient(baseUrl, {
      username: 'username',
      password: 'password'
    });

    assert.equal(client.auth, undefined);
    assert.equal(client.oauth, undefined);

    done();
  });

  it('should complain about missing username/password if auth.type === basic', function (done) {
    assert.throws(function () {
      new BitbucketClient(baseUrl, {
        type: 'basic'
      });
    }, 'Auth\'s username and/or password is missing');

    assert.throws(function () {
      new BitbucketClient(baseUrl, {
        type: 'basic',
        username: 'username'
      });
    }, 'Auth\'s username and/or password is missing');

    assert.throws(function () {
      new BitbucketClient(baseUrl, {
        type: 'basic',
        password: 'password'
      });
    }, 'Auth\'s username and/or password is missing');

    done();
  });

  describe('should complain about missing oauth attributes when auth.type === oauth', function () {
    var attributes = ['consumer_key', 'consumer_secret', 'signature_method', 'token', 'token_secret'];

    _.each(attributes, function (attribute) {
      it('missing oauth attribute ' + attribute, function (done) {
        assert.throws(function () {
          new BitbucketClient(baseUrl, _.omit(oauth, attribute))
        }, 'OAuth\'s ' + attribute + ' is missing');

        done();
      });

    });
  });

  it('should create a bitbucket client with no auth or oauth', function (done) {
    var client = new BitbucketClient(baseUrl);
    assert.typeOf(client, 'object');

    assert.equal(client.baseUrl, baseUrl);
    assert.equal(client.auth, undefined);
    assert.equal(client.oauth, undefined);

    assert.isNotNull(client.projects);
    assert.isNotNull(client.branches);
    assert.isNotNull(client.repos);
    assert.isNotNull(client.prs);
    assert.isNotNull(client.hooks);
    assert.isNotNull(client.settings);

    done();
  });

  it('should create a bitbucket client with auth.type === basic', function (done) {
    var client = new BitbucketClient(baseUrl, auth);
    assert.typeOf(client, 'object');

    assert.equal(client.baseUrl, baseUrl);
    assert.equal(client.auth, auth);

    assert.isNotNull(client.projects);
    assert.isNotNull(client.branches);
    assert.isNotNull(client.repos);
    assert.isNotNull(client.prs);
    assert.isNotNull(client.hooks);
    assert.isNotNull(client.users);
    assert.isNotNull(client.settings);

    done();
  });

  it('should create a bitbucket client with auth.type === oauth', function (done) {
    var client = new BitbucketClient(baseUrl, oauth);
    assert.typeOf(client, 'object');

    assert.equal(client.baseUrl, baseUrl);
    assert.equal(client.oauth, oauth);

    assert.isNotNull(client.projects);
    assert.isNotNull(client.branches);
    assert.isNotNull(client.repos);
    assert.isNotNull(client.prs);
    assert.isNotNull(client.hooks);

    done();
  });

  describe('should set request params properly with a GET request', function () {
    var requestGet;

    beforeEach(function () {
      requestGet = sinon.stub(request, 'get');
    });

    afterEach(function () {
      requestGet.restore();
    });

    it('should set uri and auth params properly', function (done) {
      var client = new BitbucketClient(baseUrl, auth);
      requestGet.returns(Promise.resolve(repos));

      client.get('repos')
        .then(function () {
          assert.equal(requestGet.getCall(0).args[0].uri,
            'http://localhost/repos');

          assert.equal(requestGet.getCall(0).args[0].auth,
            auth);

          done();
        });
    });

    it('should set uri and oauth params properly', function (done) {
      var client = new BitbucketClient(baseUrl, oauth);
      requestGet.returns(Promise.resolve(repos));

      client.get('repos')
        .then(function () {
          assert.equal(requestGet.getCall(0).args[0].uri,
            'http://localhost/repos');

          assert.equal(requestGet.getCall(0).args[0].oauth,
            oauth);

          done();
        });
    });
  });

  describe('should set request params properly with a POST request', function () {
    var requestPost;

    beforeEach(function () {
      requestPost = sinon.stub(request, 'post');
      requestPost.returns(Promise.resolve(repos));
    });

    afterEach(function () {
      requestPost.restore();
    });

    it('should set uri and auth params properly', function (done) {
      var client = new BitbucketClient(baseUrl, auth);

      client.put('repos')
        .then(function () {
          assert.equal(requestPost.getCall(0).args[0].uri,
            'http://localhost/repos');

          assert.equal(requestPost.getCall(0).args[0].auth,
            auth);

          done();
        });
    });

    it('should set uri and oauth params properly', function (done) {
      var bitbucketClient2 = new BitbucketClient(baseUrl, oauth);

      bitbucketClient2.put('repos')
        .then(function () {
          assert.equal(requestPost.getCall(0).args[0].uri,
            'http://localhost/repos');

          assert.equal(requestPost.getCall(0).args[0].oauth,
            oauth);

          done();
        });
    });
  });
});
