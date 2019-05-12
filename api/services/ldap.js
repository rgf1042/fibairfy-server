/**
 * ldap
 *
 * @description :: LDAP service for authenticating users
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

const ldapjs = require('ldapjs');
const assert = require('assert');

// Generates a token from supplied payload
module.exports.search = function(username, callback) {
    const ldap_user = process.env.LDAP_USER || 'glirldap2012';
    const ldap_pass = process.env.LDAP_PASSWORD || 'Gliraglir2012';

    var data = {};

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    var client = ldapjs.createClient({
        url: 'ldaps://ldap.guifi.net',
    });

    client.on('error', function(err) {
        callback({ error: err });
        console.log(err);
    });

    client.bind(
        'uid=' + ldap_user + ',o=glirusers,dc=guifi,dc=net',
        ldap_pass,
        function(err) {
            if (err) {
                if (err.lde_message == 'Invalid Credentials') {
                    callback({ error: err.lde_message });
                }
            } else {
                var opts = {
                    filter: '(&(cn=lectura)(memberUid=' + username + '))',
                    scope: 'sub',
                    attributes: ['cn'],
                };

                client.search('o=glirusers,dc=guifi,dc=net', opts, function(
                    err,
                    res
                ) {
                    assert.ifError(err);

                    res.on('searchEntry', function(entry) {
                        data = entry.object;
                    });
                    res.on('error', function(err) {
                        console.error('error: ' + err.message);
                        callback({ error: err.lde_message });
                    });
                    res.on('end', function(result) {
                        callback(data);
                    });
                });
            }
        }
    );
};

// Verifies token on a request
module.exports.authenticate = function(credentials, callback) {
    const ldap_user = process.env.LDAP_USER || 'glirldap2012';
    const ldap_pass = process.env.LDAP_PASSWORD || 'Gliraglir2012';

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    var client = ldapjs.createClient({
        url: 'ldaps://ldap.guifi.net',
    });

    client.on('error', function(err) {
        callback({ error: err });
        console.log(err);
    });

    client.bind(
        'uid=' + credentials.username + ',o=glirusers,dc=guifi,dc=net',
        credentials.password,
        function(err) {
            if (err) {
                if (err.lde_message === 'Invalid Credentials') {
                    console.log('Wrong Credentials!');
                    callback({ error: err.lde_message });
                } else {
                    console.log(err);
                    callback({ error: err.lde_message });
                }
            } else {
                callback({ message: 'Good Credentials' });
            }
        }
    );
};
