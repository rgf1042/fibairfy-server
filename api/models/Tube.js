/**
 * @module Tube
 * @description Tube inside Cable
 */

module.exports = {
    tableName: 'fiberfy_tubes',
    attributes: {
        name: {
            type: 'string',
        },
        cable: {
            model: 'Cable',
            required: true,
        },
        color: {
            type: 'string',
        },
        fibers: {
            collection: 'Fiber',
            via: 'tube',
        },
        observations: {
            type: 'string',
        },

        project: {
            model: 'Project',
        },
    },
    beforeDestroy: function(criteria, proceed) {
        if (criteria.where.id) {
            Fiber.destroy({ tube: criteria.where.id }).exec(function(err) {
                proceed(err);
            });
        } else {
            proceed();
        }
    },
};
