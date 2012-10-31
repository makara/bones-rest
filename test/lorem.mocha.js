require('./fixture');

var bonesTest = require('bones-test');
var server = bonesTest.server();

describe('Lorem, a simple model', function() {
    bonesTest.testModel(server, 'Lorem');
    bonesTest.testModelCRUD(server, 'Lorem', {
        id: 'lorem',
        name: 'Lorem'
    }, {
        another: 'Ipsum'
    });
    bonesTest.testModelCRUDHTTP(server, 'Lorem', {
        id: 'lorem',
        name: 'Lorem'
    }, {
        another: 'Ipsum'
    });
});
