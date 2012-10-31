// JSONP.
// TODO: remove, once we are on Express 3.x.
resource = Bones.Resource.extend({
    initialize: function(options) {
        options || (options = {});
        var app = options.app || this.app;
        this.use(function(req, res, next) {
            // Requires 'callback=[callback]'.
            if (_(req.query).has('callback')) {
                app.enable('jsonp callback');
            }
            next();
        });
    }
});
