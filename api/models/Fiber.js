/**
 * @module Fiber
 * @description Fiber inside Tube
 */

module.exports = {
    tableName: 'fiberfy_fibers',
    attributes: {
        name: {
            type: 'string',
        },
        tube: {
            model: 'Tube',
            required: true,
        },
        color: {
            type: 'string',
        },
        observations: {
            type: 'string',
        },

        project: {
            model: 'Project',
        },
    },
};
