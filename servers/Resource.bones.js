// A demo server with only a set of helpers.
server = Bones.Server.extend({
    initialize: function(app) {
        this.mounted = {};
    },
    mount: function(name, route) {
        if (this.plugin.resources && this.plugin.resources[name]) {
            route || (route = '/');
            // Don't mount a same resource to a same route twice or more.
            this.mounted[route] || (this.mounted[route] = {});
            if (!this.mounted[route][name]) {
                var resource = new this.plugin.resources[name]();
                // Handle dependencies.
                _(resource.dependencies || null).each(function(name, route) {
                    this.mount(name, route);
                }, this);
                this.mounted[route][name] = true;
                resource.mountTo(this, route);
            }
        }
        return this;
    },
    mountAll: function() {
        _(this.plugin.resources || null).each(function(Res, name) {
            this.mount(name);
        }, this);
        return this;
    }
});
