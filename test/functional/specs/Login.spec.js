const request = require('supertest');
const chai = require('chai');
const faker = require('faker');

const name = 'test';
const passwd = 'password';
const wrong_passwd = 'wrong-password';

describe('Login', function() {
    it('should create local User', function(done) {
        // Create User
        User.create({ username: name, password: passwd }).exec(function(
            err,
            user
        ) {
            chai.assert.equal(user.username, name);
            done();
        });
    });

    it('should local login', function(done) {
        request(sails.hooks.http.app)
            .post('/auth/login')
            .send({ username: name, password: passwd })
            .end(function(err, response) {
                if (err) return done(err);

                chai.assert.isNotEmpty(response.body.token);
                done();
            });
    });

    it('should local login with wrong password', function(done) {
        request(sails.hooks.http.app)
            .post('/auth/login')
            .send({ username: name, password: wrong_passwd })
            .end(function(err, response) {
                if (err) return done(err);

                chai.assert.equal(response.body.flag, false);
                done();
            });
    });

    it('should local login with empty parameters', function(done) {
        request(sails.hooks.http.app)
            .post('/auth/login')
            .send()
            .end(function(err, response) {
                if (err) return done(err);

                chai.assert.equal(response.body.flag, false);
                done();
            });
    });

    it('should local login with wrong username', function(done) {
        request(sails.hooks.http.app)
            .post('/auth/login')
            .send({ username: wrong_passwd, password: passwd })
            .end(function(err, response) {
                if (err) return done(err);

                chai.assert.equal(response.body.flag, false);
                done();
            });
    });
});
