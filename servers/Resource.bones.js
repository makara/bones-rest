// A demo server with only a set of helpers.
server = Bones.Server.extend({
    mount: function(name) {
        if (this.plugin.resources && this.plugin.resources[name]) {
            var resource = new this.plugin.resources[name]();
            resource.mountTo(this);
        }
        return this;
    },
    mountAll: function() {
        _(this.plugin.resources || null).each(function(Res) {
            var resource = new Res();
            resource.mountTo(this);
        }, this);
        return this;
    }
});
