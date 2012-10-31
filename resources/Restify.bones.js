// A demo resource. Adds some middlewares useful for a REST service.
resource = Bones.Resource.extend({
    initialize: function(options) {
        this.use(middleware.bodyParser());
        this.use(middleware.cookieParser());
    }
});
