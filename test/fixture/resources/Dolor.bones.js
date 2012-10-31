resource = Bones.Resource.extend({
    initialize: function(options) {
        this.get('/dolor', function(req, res, next) {
            res.send('Lorem ipsum dolor sit amet');
        });
    }
});
