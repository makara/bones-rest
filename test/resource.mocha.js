require('./fixture');

var bonesTest = require('bones-test');
var server = bonesTest.server();

describe('Resource', function() {
    describe('Bones', function() {
        it('should have resources', function(done) {
            server.plugin.should.be.a('object');
            server.plugin.should.have.property('resources');
            server.plugin.resources.should.be.a('object');
            setTimeout(done, 1);
        });
    });

    describe('Lorem resource', function() {
        it('should be a resource', function(done) {
            server.plugin.resources.should.be.a('object');
            server.plugin.resources.should.have.property('Lorem');
            setTimeout(done, 1);
        });

        it('should have a custom function', function(done) {
            var Test = new server.plugin.resources.Lorem();
            Test.should.be.a('object');
            Test.should.have.property('custom');
            Test.custom.should.be.a('function');
            Test.custom().should.equal('1f4a1137268b8e384e50d0fb72c627c4');
            setTimeout(done, 1);
        });
    });
});
