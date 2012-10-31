var should = require('should');
var request = require('request');

require('./fixture');

var bonesTest = require('bones-test');
var server = bonesTest.server();

describe('Dolor, a simple resource', function() {
    before(function(done) {
        server.start(done);
    });

    after(function(done) {
        server.on('close', done);
        server.close();
    });

    describe('HEAD /dolor', function() {
        it('should return the headers', function(done) {
            request.head({
                uri: 'http://127.0.0.1:3000/dolor'
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                res.should.not.have.property('body');
                res.should.have.property('headers');
                res.headers.should.be.a('object');
                res.headers.should.have.property('access-control-allow-origin');
                res.headers.should.have.property('access-control-allow-methods');
                res.headers.should.have.property('access-control-allow-headers');
                res.headers.should.have.property('content-type');
                res.headers.should.have.property('content-length');
                setTimeout(done, 1);
            });
        });
    });

    describe('OPTIONS /dolor', function() {
        it('should return only a GET in the body', function(done) {
            request({
                method: 'OPTIONS',
                uri: 'http://127.0.0.1:3000/dolor'
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                res.should.have.property('body', 'GET');
                setTimeout(done, 1);
            });
        });
    });

    describe('Get /dolor', function() {
        it('should return the text', function(done) {
            request.get({
                uri: 'http://127.0.0.1:3000/dolor'
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                res.should.have.property('body', 'Lorem ipsum dolor sit amet');
                setTimeout(done, 1);
            });
        });
    });
});
