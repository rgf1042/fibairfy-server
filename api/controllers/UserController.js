/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req, res) {
        User.create(req.body).exec(function(err, user) {
            if (err) {
                return res.status(500).json({ err: err });
            }
            // If user created successfuly we return user and token as response
            if (user) {
                // NOTE: payload is { id: user.id}
                res.status(200).json({
                    user: user,
                    token: jwToken.issue({ id: user.id }),
                });
            }
        });
    },
};
