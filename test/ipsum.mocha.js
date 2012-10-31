require('./fixture');

var bonesTest = require('bones-test');
var server = bonesTest.server();

describe('Ipsum, a simple model', function() {
    bonesTest.testModel(server, 'Ipsum');
    bonesTest.testModelCRUD(server, 'Ipsum', {
        id: 'ipsum',
        name: 'Ipsum'
    }, {
        another: 'Dolor'
    });
    bonesTest.testModelCRUDHTTP(server, 'Ipsum', {
        id: 'ipsum',
        name: 'Ipsum'
    }, {
        another: 'Dolor'
    });
});
