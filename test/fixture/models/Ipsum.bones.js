// Demonstrate a model that requires an ID.
model = Backbone.Model.extend({
    url: function() {
        if (_(this.id).isUndefined()) {
            return '/api/Ipsum';
        }
        return '/api/Ipsum/' + encodeURIComponent(this.id);
    }
});
