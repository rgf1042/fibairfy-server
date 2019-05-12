const geolib = require('geolib');

module.exports = {
    friendlyName: 'Get distance path',

    description: 'Returns path distance using geolib.',

    inputs: {
        first: {
            type: 'number',
            example: 23,
            description: 'Id for first site',
            required: true,
        },
        last: {
            type: 'number',
            example: 23,
            description: 'Id for last site',
            required: true,
        },
        intermedial: {
            type: 'ref',
        },
    },

    // firstId, lastId, intermedial
    fn: async function(inputs, exits) {
        // We calculate distances
        let first, last, points;
        try {
            first = await Site.findOne(inputs.first);
            last = await Site.findOne(inputs.last);
        } catch (err) {
            console.log(err);
            return exits.error(err);
        }
        points = [[first.latitude, first.longitude]];
        if (inputs.intermedial && inputs.intermedial.length > 0) {
            points = points.concat(inputs.intermedial);
        }
        points.push([last.latitude, last.longitude]);
        let result = 0;
        for (let x = 1; x < points.length; ++x) {
            result += geolib.getDistance(
                {
                    latitude: points[x - 1][0],
                    longitude: points[x - 1][1],
                },
                {
                    latitude: points[x][0],
                    longitude: points[x][1],
                }
            );
        }
        return exits.success(result);
    },
};
