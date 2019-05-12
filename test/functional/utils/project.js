const request = require('supertest');

// Default project information
const latitude = 41.66060124302088;
const longitude = 1.571044921875;
const zoom = 8;
const defaultZone = 2413;
const status = 'Planned';

module.exports.createDefaultProject = function(name, username, callback) {
    User.findOne({ username: username }).exec(function(err, user) {
        let project;
        if (err) return callback(project, err);
        Project.create({
            name: name,
            latitude: latitude,
            longitude: longitude,
            zoom: zoom,
            defaultZone: defaultZone,
            status: status,
        }).exec(function(err, project) {
            User.addToCollection(user.id, 'projects', project.id).exec(function(
                err,
                rel
            ) {
                if (err) return callback(project, err);
                callback(project, err);
            });
        });
    });
};
