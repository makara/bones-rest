// .
servers['Core'].augment({
    initialize: function(parent, app) {
        parent.call(this, app);

        // Mount resources all together.
        // Resources can be mounted individually. @see the Resource server.
        var resource = new servers['Resource'](app);
        resource.mountAll();
        this.use(resource);
    }
});
