/**
 * MapsController
 *
 * @description :: Middleware for accessing mapserver
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const httpProxy = require('http-proxy');
const querystring = require('querystring');

async function prepareList (type, auth) {
  let listInternal = [];
  let listExternal = [];
  let whereLayers = {};
  if (!auth) whereLayers['auth'] = false;

  listInternal = await MapSource.find({
    where: {
      type: type,
      internal: true
    },
    select:['name','description','type', 'internal','options'],
    sort: 'weight ASC'
  }).populate('layers', {
    where: whereLayers,
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
    where: whereLayers,
    select: ['name', 'description', 'isBase', 'options'],
    sort: 'weight ASC'
  });

  for (let x in listInternal) {
    // We generate the urls
    let map = listInternal[x];
    let regex = /:id\b/;
    let controller;
    if (auth) controller = 'MapController.wmsAuth';
    else controller = 'MapController.wmsNoAuth';
    map.url = sails.config.custom.baseUrl + sails.getUrlFor(controller).replace(regex, map.id);
  }

  return listInternal.concat(listExternal);
}

async function validateWMS (id, layers, auth) {
  let map;
  let whereLayers = {};

  whereLayers['wmsLayer'] = layers;
  if (!auth) whereLayers['auth'] = false;

  try {
    map = await MapSource.find({where: {id: id, type: 'wms'}}).populate('layers', {
      where: whereLayers
    });
  } catch (err) {
    throw err;
  }

  if (!map[0]) throw Error('No valid map supplied');

  try {
    if (map[0].layers[0].wmsLayer !== layers) throw Error('No valid map supplied');
  } catch (err) {
    throw Error('No valid map supplied');
  }

  return map;
}

module.exports = {
  wmsAuth: async function (req, res) {
    let id = req.param('id');
    let layers = req.param('LAYERS');
    let map = [];

    if (!id || !layers) {
      return res.badRequest({msg: 'No id or layer supplied '});
    }

    try {
      map = await validateWMS(id, layers, true);
    } catch (err) {
      console.log(err);
      return res.badRequest({msg: err.message});
    }

    let apiProxy = httpProxy.createProxyServer(
      {
        ignorePath: false
      });
    apiProxy.web(req, res,
      {target: map[0].url + '&' + querystring.stringify(req.allParams())});
	},
  wmsNoAuth: async function (req, res) {
    let id = req.param('id');
    let layers = req.param('LAYERS');
    let map = [];

    if (!id || !layers) {
      return res.badRequest({msg: 'No id or layer supplied '});
    }

    try {
      map = await validateWMS(id, layers, false);
    } catch (err) {
      console.log(err);
      return res.badRequest({msg: err.message});
    }

    let apiProxy = httpProxy.createProxyServer(
      {
        ignorePath: false
      });
    apiProxy.web(req, res,
      {target: map[0].url + '&' + querystring.stringify(req.allParams())});
  },
  listAuth: async function (req, res) {
    // We get type
    let type = req.param('type');

    let list = [];
    try {
      list = await prepareList(type, true); // We are auth
    } catch (err) {
      console.log(err);
      return res.badRequest({msg: err});
    }
    res.ok(list);
  },
  listNoAuth: async function (req, res) {
    // We get type
    let type = req.param('type');

    let list = [];
    try {
      list = await prepareList(type, false); // We are auth
    } catch (err) {
      console.log(err);
      return res.badRequest({msg: err});
    }
    res.ok(list);
  }
};
