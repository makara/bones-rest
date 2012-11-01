// A demo resource. Provides the model CRUD end-points.
// @see bones/servers/Route.bones.js
resource = Bones.Resource.extend({
    // The model name.
    name: null,
    // The base route path.
    route: null,
    // The default routers for a model.
    // TODO: what about collection?
    initialize: function(options) {
        options || (options = {});
        options.name && (this.name = options.name);

        // No routers if no model.
        if (!this.name || !models[this.name]) return;

        _.bindAll(this, 'prepareModel', 'fetchModel', 'saveModel', 'readModel',
            'deleteModel', 'loadCollection');

        // Always prepare a model.
        this.use(this.prepareModel);
        // Index.
        this.get('/', this.loadCollection);
        // Param.
        this.param('id', this.fetchModel);
        // CRUD.
        this.post('/', this.saveModel);
        this.get('/:id', this.readModel);
        this.put('/:id', this.saveModel);
        this.del('/:id', this.deleteModel);
    },
    prepareModel: function(req, res, next) {
        // Pass any querystring paramaters to the model.
        this.model = new models[this.name]({}, req.query);
        next();
    },
    loadCollection: function(req, res, next) {
        var name = Bones.utils.pluralize(this.name);
        if (name in models) {
            // Pass any querystring paramaters to the collection.
            this.collection = new models[name]([], req.query);
            this.collection.fetch({
                success: function(collection, resp) {
                    res.json(resp);
                },
                error: function(collection, err) {
                    var error = err instanceof Object ? err.message : err;
                    next(new Error.HTTP(error, err && err.status || 500));
                }
            });
        } else {
            next();
        }
    },
    fetchModel: function(req, res, next, id) {
        // Model can have an idAttribute other than id.
        var data = {};
        data[this.model.idAttribute || 'id'] = id;
        this.model.set(data, {
            silent: true
        }).fetch({
            success: function(model, resp) {
                // TODO: put model into req?
                next();
            },
            error: function(model, err) {
                var error = err instanceof Object ? err.message : err;
                next(new Error.HTTP(error, err && err.status || 404));
            }
        });
    },
    readModel: function(req, res, next) {
        res.json(this.model.toJSON());
    },
    saveModel: function(req, res, next) {
        this.model.save(req.body, {
            success: function(model, resp) {
                res.json(resp);
            },
            error: function(model, err) {
                var error = err instanceof Object ? err.message : err;
                next(new Error.HTTP(error, err && err.status || 409));
            }
        });
    },
    deleteModel: function(req, res, next) {
        this.model.destroy({
            success: function(model, resp) {
                res.json({});
            },
            error: function(model, err) {
                var error = err instanceof Object ? err.message : err;
                next(new Error.HTTP(error, err && err.status || 409));
            }
        });
    }
});
