var path = require('path');
var Bones = require(global.__BonesPath__ || 'bones');

module.exports = Resource;

function Resource(options) {
    // An Express application is the core. Every resources have a new
    // application so they can be used by each other, but they don't share
    // settings etc.
    // TODO: HTTPS.
    this.app = Bones.middleware.createServer();
    this.initialize.apply(this, arguments);
};

// Initialize is an empty function by default. Override it with your own
// initialization logic.
Resource.prototype.initialize = function() {};

// Helpers
// -------

// Redirect Express methods.
var methods = require('methods').concat([
    'del',
    'all',
    'param',
    'set',
    'enable',
    'enabled',
    'disable',
    'disabled',
    'configure'
]);
methods.forEach(function(method) {
    Resource.prototype[method] = function() {
        return this.app && this.app[method].apply(this.app, arguments);
    };
});

// The use method can also use a resource in addition to a function or an
// Express application.
Resource.prototype.use = function(route, resource) {
    if ('string' != typeof route) resource = route, route = '/';
    var handler;
    if (resource.app && resource.app.handle && resource.app.set) {
        handler = resource.app;
    } else {
        // TODO: further checking?
        handler = resource;
    }
    return this.app && this.app.use(route, handler);
};

// Mount my app to a given app.
Resource.prototype.mountTo = function(app, route) {
    route || (route = '/');
    if (this.route) {
        route = path.resolve(route, this.route);
    }
    app.use(route, this.app);
};

Resource.augment = Backbone.Router.augment;
Resource.extend = Backbone.Router.extend;
