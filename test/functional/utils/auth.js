const request = require('supertest');

module.exports.localAuth = function(credentials, authorization, callback) {
    request(sails.hooks.http.app)
        .post('/auth/login')
        .send({
            username: credentials.username,
            password: credentials.password,
        })
        .end(function(err, response) {
            if (err) return callback(err);
            authorization.token = response.body.token;
            authorization.id = response.body.id;
            callback();
        });
};

module.exports.createUser = function(username, password, callback) {
    User.create({
        username: username,
        password: password,
    }).exec(function(err, user) {
        if (err) return callback(err);
        callback(err);
    });
};
