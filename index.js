var path = require('path');

var Bones = require('bones');
var plugin = Bones.plugin;
var utils = Bones.utils;
var _ = Bones._;

// Add the ability to load resources.
// ----------------------------------
// The basic class that every other resources should extend from.
Bones.Resource = require(path.join(__dirname, 'server/resource'));
// Load server side wrappers for resources.
utils.wrappersServer = _(utils.wrappersServer).extend(
    utils.loadWrappers(path.join(__dirname, 'server')));
// Load resources while loading.
plugin.resources = plugin.resources || {};
plugin.load = _(plugin.load).wrap(function(parent, dir) {
    var self = parent.call(this, dir);
    self.require(dir, 'resources');
    return self;
});

// Support bones-mixin.
// TODO: maybe drop the custom plugin above and use bones-mixin.
try {
    var bonesMixin = require('bones-mixin');
    bonesMixin(Bones.Resource);
    bonesMixin(Bones.Resource.prototype);
} catch (err) {}

// Load me.
Bones.load(__dirname);
