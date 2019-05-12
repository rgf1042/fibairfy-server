/**
 * SwaggerController
 *
 * @description :: Server-side logic for viewing Swagger
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    view: function(req, res) {
        return res.view('swagger');
    },
};
