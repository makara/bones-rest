resource = Bones.Resource.extend({
    initialize: function(options) {
        this.use('/api/Ipsum', new resources.Model({
            name: 'Ipsum'
        }));
    }
});
