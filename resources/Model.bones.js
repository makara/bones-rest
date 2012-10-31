// A demo resource. Provides the model CRUD end-points.
// @see bones/servers/Route.bones.js
// TODO: reorganize methods.
resource = Bones.Resource.extend({
    // The model name.
    name: null,
    // The base route path.
    route: null,
    // .
    initialize: function(options) {
        options || (options = {});
        options.name && (this.name = options.name);

        // .
        if (!this.name || !models[this.name]) return;

        _.bindAll(this, 'loadModel', 'getModel', 'saveModel', 'delModel',
            'loadCollection');

        // Index.
        this.get('/', this.loadCollection);
        // CRUD.
        this.post('/', this.loadModel, this.saveModel);
        this.get('/:id', this.loadModel, this.getModel);
        this.put('/:id', this.loadModel, this.saveModel);
        this.del('/:id', this.loadModel, this.delModel);
    },
    // .
    loadCollection: function(req, res, next) {
        var name = Bones.utils.pluralize(this.name);
        if (name in this.models) {
            // Pass any querystring paramaters to the collection.
            this.collection = new this.models[name]([], req.query);
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
    // .
    loadModel: function(req, res, next) {
        // Pass any querystring paramaters to the model.
        this.model = new models[this.name]({
            id: req.params.id
        }, req.query);
        next();
    },
    // .
    getModel: function(req, res, next) {
        this.model.fetch({
            success: function(model, resp) {
                res.json(resp);
            },
            error: function(model, err) {
                var error = err instanceof Object ? err.message : err;
                next(new Error.HTTP(error, err && err.status || 404));
            }
        });
    },
    // .
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
    // .
    delModel: function(req, res, next) {
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
