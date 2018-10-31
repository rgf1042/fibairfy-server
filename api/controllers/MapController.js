/**
 * MapsController
 *
 * @description :: Middleware for accessing mapserver
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const httpProxy = require('http-proxy');
const querystring = require('querystring');

module.exports = {
  wms: async function (req, res) {
    let id = req.param('id');

    if (!id) {
      return res.badRequest({msg: 'No id is supplied '});
    }
    let map;
    try {
      map = await MapSource.find({where:{id: id, type: 'wms'}});
    } catch (err) {
      return res.badRequest({msg: err});
    }

    if (!map[0]) return res.badRequest({msg: 'No valid map supplied'});

    let apiProxy = httpProxy.createProxyServer(
      {
        ignorePath: false
      });
    apiProxy.web(req, res,
      {target: map[0].url + '&' + querystring.stringify(req.allParams())});
	},
  list: async function (req, res) {
    // We get type
    let type = req.param('type');

    let listInternal = [];
    listExternal = [];
    try {
      listInternal = await MapSource.find({
        where: {
          type: type,
          internal: true
        },
        select:['name','description','type', 'internal','options'],
        sort: 'weight ASC'
      }).populate('layers', {
        select: ['name', 'description', 'isBase', 'options'],
        sort: 'weight ASC'
      });
      listExternal = await MapSource.find({
        where: {
          type: type,
          internal: false
        },
        select:['name','description','type', 'internal','url', 'options'],
        sort: 'weight ASC'
      }).populate('layers', {
        select: ['name', 'description', 'isBase', 'options'],
        sort: 'weight ASC'
      });
    } catch (err) {
      console.log(err);
      return res.badRequest({msg: err});
    }

    for (let x in listInternal) {
      // We generate the urls
      let map = listInternal[x];
      let regex = /:id\b/;
      map.url = sails.config.custom.baseUrl + sails.getUrlFor('MapController.wms').replace(regex, map.id);
    }
    res.ok(listInternal.concat(listExternal));
  }
};
