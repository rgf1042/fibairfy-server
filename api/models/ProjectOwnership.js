/**
 * @module ProjectOwnership
 * @description Workspace group by users (permissions)
 */

module.exports = {
    tableName: 'fiberfy_projects_ownership',
    attributes: {
        project: {
            model: 'Project',
        },
        user: {
            model: 'User',
        },
    },
};
