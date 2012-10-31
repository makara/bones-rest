// Cleanup the Core server so it doesn't serve anything by default.
// TODO: HTTPS.
servers['Core'].prototype.initialize = function(app) {
    this.port = app.config.port || this.port;
};
